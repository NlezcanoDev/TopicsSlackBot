import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import { ExternalServiceError } from "../errors";

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
			const { data } = await this.#openAi.createCompletion({
				model: "curie",
				prompt: text,
				temperature: 0,
				max_tokens: 60,
				top_p: 1,
				frequency_penalty: 0.5,
				presence_penalty: 0,
			});

			if (data?.choices[0].text.includes("\n")) {
				return data?.choices[0].text.split("\n").filter((d) => d)[0];
			}

			return data?.choices[0].text || "";
		} catch {
			// Log
			throw new ExternalServiceError();
		}
	}

	async generateFromHistory(historyList) {
		const text = `
			Necesito crear un nuevo tópico para una reunion informal donde los 
			participantes deben tener un gif representacional obtenido de Tenor.
			Por ejemplo, los ultimos tópicos fueron:
			${historyList.join("-- \n")}

			El próximo tópico será
		`;

		return await this.generateFromPrompt(text);
	}
}

export const openAiService = new OpenAiService();
