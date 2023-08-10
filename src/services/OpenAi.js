import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

config();

class OpenAiService {
	/**
	 * @type Configuration
	 */
	#config;

	/**
	 * @type OpenAIApi
	 */
	#openAi;

	constructor() {
		this.#config = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}

	init() {
		if (this.#openAi instanceof Object) return;
		this.#openAi = new OpenAIApi(this.#config);
	}

	async generateFromPrompt(text) {
		try {
			const { data } = await this.#openAi.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: text,
					},
				],
				temperature: 0.8,
				max_tokens: 80,
			});

			if (data?.choices[0].message.content.includes("\n")) {
				return data?.choices[0].message.content.split("\n").filter((d) => d)[0];
			}

			return data?.choices[0].message.content || "";
		} catch (e) {
			return new Error();
		}
	}

	async generateFromHistory(historyList) {
		const text = `
			Necesito crear una nueva temática para una reunion informal que sea graciosa o pueda generar anecdotas.
			Recordá que somos un grupo de jovenes adultos algo nerds.
			Algunos ejemplos son:
			${historyList.join(", ")}

			Basándote en ese formato y sin repetir, dime la proxima temática de manera random.
			Recordá que solo necesito el titulo de la temática.
		`;

		return await this.generateFromPrompt(text);
	}
}

export const openAiService = new OpenAiService();
