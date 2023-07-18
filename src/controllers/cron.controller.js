import Config from "../models/Config";
import Topic from "../models/Topic";
import { slackService } from "../services/Slack";
import { openAiService } from "../services/OpenAi";

const cronCallback = async () => {
	try {
		const data = await Topic.find();
		const lastTopics = data.slice(0, 15);
		const lastTitles = lastTopics.map((d) => d.topic);

		const topic = await openAiService.generateFromHistory(lastTitles);
		const { slack, cron: cronjob } = await Config.findOne();

		if (cronjob.hasOverrideTime) {
			cronjob.overrideTime = null;
			cronjob.hasOverrideTime = false;
			await Config.findOneAndUpdate({}, { cron: { ...cronjob } });
		}

		if (cronjob.hasCallback) {
			const message = `La temática de la siguiente reunión es: ${topic}`;
			await slackService.postMessage(message, slack.channel[0]);
		} else {
			await Config.findOneAndUpdate({}, { cron: { ...cronjob, hasCallback: true } });
		}
	} catch (e) {
		console.error(e.message);
	}
};

const omitTask = async (_, res, next) => {
	try {
		const { cron: cronjob } = await Config.findOne();

		await Config.findOneAndUpdate({}, { cron: { ...cronjob, hasCallback: true } });

		res.status(200).json({
			response_type: "in_channel",
			text: "Se omitió la proxima reunión. Nos vemos luego!",
		});
		// TODO agregar mensaje al grupo general
	} catch (e) {
		next(e);
	}
};

const postponeTask = async (req, res, next) => {
	// NO IMPLEMENTADO
};

const advanceTask = async (req, res, next) => {
	// NO IMPLEMENTADO
};

const configCronjob = async (req, res, next) => {
	// NO IMPLEMENTADO
};

export const CronController = {
	cronCallback,
	omitTask,
	postponeTask,
	advanceTask,
	configCronjob,
};
