import { CronJob } from "cron";
import { CronController } from "../controllers/cron.controller";
import Config from "../models/Config";

// const callback = async () => {
// 	const data = await Topic.find();
// 	const lastTopics = data.slice(0, 15);
// 	const lastTitles = lastTopics.map((d) => d.topic);

// 	const topic = await openAiService.generateFromHistory(lastTitles);
// 	await SlackApiService.postMessage(topic);
// 	await postTopic(topic);
// };

// export const initCron = new CronJob("55 11,17 * * 1-5", callback, {
// 	scheduled: false,
// 	timezone: "America/Sao_Paulo",
// });

class CronJobService {
	/**
	 * @type CronJob
	 */
	#cj;
	#config;
	#cronTime;
	#callback;

	constructor() {
		if (typeof CronJobService.instance === "object") {
			return CronJobService.instance;
		}

		this.#config = {
			scheduled: false,
			timezone: "America/Sao_Paulo",
		};
	}

	init() {
		if (typeof this.#cj === "object") {
			console.info("CronJob is already created and working!");
			return;
		}

		this.#callback = CronController.cronCallback;

		Config.findOne({})
			.exec()
			.then(({ cron }) => {
				this.#cronTime = cron.overrideTime || cron.crontime;
				this.#cj = new CronJob(this.#cronTime, this.#callback, this.#config);
				this.#cj.start();
			})
			.catch((e) => {
				console.error("Fatal error on init CronJob: ", e);
			});
	}

	stop() {
		if (typeof this.#cj !== "object") {
			console.info("CronJob is already stopped");
			return;
		}

		this.#cj.stop();
	}

	restart() {
		this.stop();
		this.init();
	}

	getCronJob() {
		return this.#cj;
	}

	getCronTime() {
		return this.#cronTime;
	}

	setCronTime(crontime) {
		this.#cronTime = crontime;
	}

	getCallback() {
		return this.#callback;
	}

	setCallback(callback) {
		this.#callback = callback;
	}
}

export const cronJobService = new CronJobService();
