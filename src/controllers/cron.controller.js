import Config from "../models/Config";
import Topic from "../models/Topic";
import { slackService } from "../services/Slack";
import { openAiService } from "../services/OpenAi";
import { RequestError } from "../errors";
import { cronJobService } from "../services/CronJobs";

const cronCallback = async () => {
	try {
		const data = await Topic.find();
		const lastTopics = data.slice(0, 15);
		const lastTitles = lastTopics.map((d) => d.topic);
		let needsRestart = false;

		const { slack, cron: cronjob } = await Config.findOne();

		if (cronjob.hasOverrideTime) {
			cronjob.overrideTime = null;
			cronjob.hasOverrideTime = false;
			needsRestart = true;
		}

		const now = new Date();
		if (new Date(cronjob.holidayPeriod) > now) {
			cronjob.hasCallback = false; // TODO validar
		} else {
			cronjob.holidayPeriod = null;
		}

		if (cronjob.hasCallback) {
			const topic = await openAiService.generateFromHistory(lastTitles);
			const message = `La temática de la siguiente reunión es: ${topic}`;
			await slackService.postMessage(message, slack.channel);
		} else {
			cronjob.hasCallback = true;
		}

		await Config.findOneAndUpdate({}, { cron: { ...cronjob } });
		if (needsRestart) cronJobService.restart();
	} catch (e) {
		// TODO generar log
		console.error(e.message);
	}
};

const omitTask = async (req, res, next) => {
	try {
		const { slack } = await Config.findOne();

		await Config.findOneAndUpdate({}, { $set: { "cronjob.hascallback": false } }, { overwrite: false });

		if (req.body.channel_id !== slack.channel)
			await slackService.postMessage("Se omitió la proxima reunión. Nos vemos luego!", slack.channel);

		res.status(200).json({
			response_type: "in_channel",
			text: "Ajustes realizados con exito",
		});
	} catch (e) {
		next(e);
	}
};

const postponeTask = async (req, res, next) => {
	const payload = req.body.text.trim();
	const validBody = /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(payload);
	const [hour, min] = payload.split(":");

	const nHour = Number(hour);
	const nMin = Number(min);

	try {
		if (!validBody || isNaN(nHour) || isNaN(nMin))
			throw new RequestError("Error en el formato de hora. Recordá usar el formato hh:mm");

		if (nHour < 0 || nHour > 18 || nMin < 0 || nMin > 60)
			throw new RequestError("Mmmm eso no parece un horario laboral");

		const now = new Date();
		const dateHour = now.getHours();
		const dateMin = now.getMinutes();

		if (!(nHour >= dateHour && nMin > dateMin))
			throw new RequestError("Lo siento. No puedo posponer una reunion antes de la reunion");

		await Config.findOneAndUpdate(
			{},
			{
				$set: {
					"cron.overrideTime": `${nMin} ${nHour} * * *`,
					"cron.hasOverrideTime": true,
				},
			},
			{ overwrite: false }
		);

		cronJobService.restart();

		res.status(200).json({
			response_type: "in_channel",
			text: "Daily pospuesta con exito",
		});
	} catch (e) {
		next(e);
	}
};

const setReturnDay = async (req, res, next) => {
	const payload = req.body.text.trim();
	const day = Number(payload);

	const now = new Date();
	let dateMonth = now.getMonth() + 1;
	let dateYear = now.getFullYear();

	try {
		if (isNaN(day) || day < 1 || day > new Date(dateYear, dateMonth, 0).getDate())
			throw new RequestError("No creo que podamos volver esa fecha, recordá que solo tenés que ingresar el día");

		if (day < now.getDay()) {
			if (dateMonth == 12) {
				dateMonth = 1;
				dateYear++;
			} else {
				dateMonth++;
			}
		}

		const returnDay = new Date(dateYear, dateMonth, day);

		await Config.findOneAndUpdate({}, { $set: { "cronjob.holidayPeriod": returnDay } });

		res.status(200).json({
			response_type: "in_channel",
			text: "Nos vemos a la vuelta!",
		});
	} catch (e) {
		next(e);
	}
};

export const CronController = {
	cronCallback,
	omitTask,
	postponeTask,
	setReturnDay,
};
