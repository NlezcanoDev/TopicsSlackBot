import { config } from "dotenv";
import cohere from "cohere-ai";

config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

export const init = () => cohere.init(COHERE_API_KEY);

export const generateFromPrompt = async (text) => {
	const response = await cohere.generate({
		prompt: text,
	});

	if (response.body?.generations[0].text.includes("\n")) {
		return response.body.generations[0].text.split("\n")[0];
	}

	return response.body.generations[0].text || "";
};

export const generateFromHistory = async (historyList) => {
	const text = `
    Tengo que organizar una reunion temática.
    A modo de titulo, y en español: las ultimas temáticas fueron:
    ${historyList.join("-- \n")}

    entonces proxima tematica de la reunion será:
  `;

	return await generateFromPrompt(text);
};

export const CohereService = {
	generateFromPrompt,
	generateFromHistory,
};
