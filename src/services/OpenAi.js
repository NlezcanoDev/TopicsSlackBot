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
						role: "assistant",
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
			Necesito crear un nuevo tópico para una reunion informal donde los 
			participantes deben tener un gif que represente la temática.
			Por ejemplo:
			${historyList.join(", ")}

			Basándote en ese formato y sin repetir, dime la proxima temática de manera random
		`;

		return await this.generateFromPrompt(text);
	}
}

export const openAiService = new OpenAiService();
