import Config from "../models/Config";
import { NotFoundError, RequestError, ServerError } from "../errors";
import { slackService } from "../services/Slack";

const getChannel = async (req, res, next) => {
	try {
		const data = await Config.findOne();

		res.status(200).json({ channel: data.slack.channel });
	} catch (e) {
		next(e);
	}
};

const selectChannel = async (req, res, next) => {
	try {
		const data = await Config.findOne();
		if (!data.slack) throw new ServerError("Ocurrió un error respecto a los canales. Intentalo mas tarde");

		const payload = req.body.text;
		const channel = payload.startsWith("#") ? payload.substring(1) : null;

		if (!channel)
			throw new RequestError(`¡Hola, @${data.user_id}! No especificaste un canal válido, recordá usar el "#"`);

		const channelId = await slackService.checkChannelList(channel);

		if (!channelId)
			throw new NotFoundError(
				`¡Hola, @${data.user_id}! El canal ingresado no se encuentra en este entorno de trabajo`
			);

		await Config.findOneAndUpdate({}, { slack: { channel: channelId } });

		res.status(200).json({
			response_type: "in_channel",
			text: "Canal seleccionado con éxito",
		});
	} catch (e) {
		next(e);
	}
};

export const SlackController = {
	getChannel,
	selectChannel,
};
