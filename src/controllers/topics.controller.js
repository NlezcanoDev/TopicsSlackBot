import Topic from "../models/Topic";
import { getMeeting } from "../utils/meeting";
import { openAiService } from "../services/OpenAi";
import { ExternalServiceError, RequestError } from "../errors";

const getTopics = async (req, res, next) => {
	const pageSize = req.query.pageSize || 15;

	try {
		const topics = await Topic.find().limit(pageSize).sort({ createdAt: -1 });
		res.status(200).json(topics);
	} catch (e) {
		next(e);
	}
};

const createTopic = async (req, res, next) => {
	try {
		if (!req.body.topic) throw new RequestError();
		const topic = {
			topic: req.body.topic,
			meeting: getMeeting(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await Topic.create(topic);
		res.status(201).send("Ok");
	} catch (e) {
		next(e);
	}
};

const generateTopic = async (_, res, next) => {
	try {
		const lastTopics = await Topic.find().limit(20).sort({ createdAt: -1 });
		const lastTitles = lastTopics.map((d) => d.topic);

		const data = await openAiService.generateFromHistory(lastTitles);

		const topic = {
			topic: data,
			meeting: getMeeting(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await Topic.create(topic);

		if (topic instanceof Error) throw new ExternalServiceError("Error en la generación de temática");

		res.status(200).json({ title: topic });
	} catch (e) {
		next(e);
	}
};

const regenerateTopic = async (_, res, next) => {
	try {
		const lastTopics = await Topic.find().limit(20).sort({ createdAt: -1 });
		const lastTitles = lastTopics.map((d) => d.topic);

		const data = await openAiService.generateFromHistory(lastTitles);

		if (data instanceof Error) throw new ExternalServiceError("Error en la generación de temática");

		await Topic.findByIdAndUpdate(lastTopics[0]._id.toString(), { topic: data });

		res.status(200).json({ title: data });
	} catch (e) {
		next(e);
	}
};

const updateLastTopic = async (req, res, next) => {
	try {
		const data = await Topic.find().sort({ createdAt: -1 }).limit(1);
		if (!data.length) throw new RequestError("No hay temática para editar");

		await Topic.findByIdAndUpdate(data[0]._id.toString(), { topic: req.body.text });
		res.status(200).json({
			response_type: "in_channel",
			text: "La temática fue cambiada. Happy daily!",
		});
	} catch (e) {
		next(e);
	}
};

const specifyLastTopic = async (req, res, next) => {
	try {
		const lastTopic = await Topic.find().limit(1).sort({ createdAt: -1 });
		const lastTitle = lastTopic[0].topic;

		const prompt = `La última temática (${lastTitle}) es muy generica.
			Dame una tematica relacionada pero mas especifica
			por ejemplo: si la temática es drogas, algo mas especifico seria "drogas psicodelicas"
			Recordá que solo necesito el titulo de la temática`;

		const topic = await openAiService.generateFromPrompt(prompt);

		if (topic instanceof Error) throw new ExternalServiceError("Error en la generación de temática");

		res.status(200).json({ title: topic, topico: lastTitle });
	} catch (e) {
		next(e);
	}
};

const deleteTopics = async (_, res, next) => {
	try {
		const data = await Topic.find();
		if (data.length < 15) return new RequestError("No tenemos tantos tópicos para eliminar");

		data.slice(0, 15).forEach(async (d) => {
			const id = d._id.toString();
			await Topic.findByIdAndDelete(id);
		});
		res.status(204).send("Ok");
	} catch (e) {
		next(e);
	}
};

export const TopicsController = {
	getTopics,
	createTopic,
	generateTopic,
	regenerateTopic,
	updateLastTopic,
	specifyLastTopic,
	deleteTopics,
};
