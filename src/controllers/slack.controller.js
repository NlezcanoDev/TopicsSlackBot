import Config from "../models/Config";
import { NotFoundError, RequestError, ServerError } from "../errors";

const getChannels = async (req, res, next) => {
	try {
		const data = await Config.findOne();

		res.status(200).json(data.slack.channels);
	} catch (e) {
		next(e);
	}
};

const addChannel = async (req, res, next) => {
	try {
		const data = await Config.findOne();
		if (!data.slack) throw new ServerError();
		if (req.body.channel.length === 0) throw new RequestError();

		const currentChannels = data.slack.channels;
		console.log(currentChannels);

		await Config.findOneAndUpdate({}, { slack: { channels: [...currentChannels, req.body.channel] } });
		res.status(200).json({
			response_type: "in_channel",
			text: "Canal agregado con éxito",
		});
	} catch (e) {
		next(e);
	}
};

const removeChannel = async (req, res, next) => {
	try {
		const data = await Config.findOne();
		if (!data.slack) throw new ServerError();
		if (req.body.channel.length <= 0) throw new RequestError();

		const currentChannels = data.slack.channels;
		const filterChannels = currentChannels.filter((c) => c !== req.body.channel);

		if (currentChannels.length === filterChannels.length) throw new NotFoundError();

		await Config.findOneAndUpdate({}, { slack: { channels: filterChannels } });

		res.status(200).json({
			response_type: "in_channel",
			text: "Canal removido con éxito",
		});
	} catch (e) {
		next(e);
	}
};

export const SlackController = {
	getChannels,
	addChannel,
	removeChannel,
	preferTopic,
};
