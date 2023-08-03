import { CronJob } from "cron";
import { CronController } from "../controllers/cron.controller";
import Config from "../models/Config";
import { createLog } from "../utils/db";

class CronJobService {
	/**
	 * @type CronJob
	 */
	#cj;
	#config;
	#cronTime; // "55 11,17 * * 1-5"
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
				createLog(e, "Error al iniciar cronjob");
				console.error("Fatal error on init CronJob");
			});
	}

	stop() {
		if (typeof this.#cj !== "object") {
			console.info("CronJob is already stopped");
			return;
		}

		this.#cj.stop();
		this.#cj = undefined;
	}

	restart() {
		this.stop();
		this.#cj = undefined;
		this.init();
	}
}

export const cronJobService = new CronJobService();
