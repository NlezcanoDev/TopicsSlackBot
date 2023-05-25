import { TopicsAdmin } from "./admin";

const _admin = new TopicsAdmin();

const getTopics = async (req, res) => {
	const topics = await _admin.getTopics();
	res.status(200).json(topics);
};

const getTitles = async (_, res) => {
	const titles = await _admin.getTitleTopics();
	res.status(200).json(titles);
};

const createTopic = async (req, res) => {
	await _admin.createTopic(req.body);
	res.status(201).send("Ok");
};

const generateTopic = async (_, res) => {
	const topic = await _admin.generateTopic();
	res.status(200).json({ title: topic });
};

const deleteTopics = async (_, res) => {
	await _admin.deleteTopics();
	res.status(204).send("Ok");
};

export const TopicsController = {
	getTopics,
	getTitles,
	createTopic,
	generateTopic,
	deleteTopics,
};
