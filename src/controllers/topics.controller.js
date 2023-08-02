import Topic from "../models/Topic";
import { getMeeting } from "../utils/meeting";
import { openAiService } from "../services/OpenAi";
import { ExternalServiceError, RequestError } from "../errors";

const getTopics = async (req, res, next) => {
	const { pageSize } = req.query || 15;

	try {
		const data = await Topic.find().sort({ createdAt: -1 });
		const topics = data.slice(0, pageSize);
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
		const data = await Topic.find().sort({ createdAt: -1 });
		const lastTopics = data.slice(0, 15);
		const lastTitles = lastTopics.map((d) => d.topic);

		const topic = await openAiService.generateFromHistory(lastTitles);

		if (topic instanceof Error) throw new ExternalServiceError("Error en la generación de temática");

		res.status(200).json({ title: topic });
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
	updateLastTopic,
	deleteTopics,
};
