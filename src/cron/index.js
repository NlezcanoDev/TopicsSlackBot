import { CronJob } from "cron";
import { TopicsAdmin } from "../topics/admin";

const _admin = new TopicsAdmin();

export const initCron = new CronJob(
	"0 55 11,17 * * *",
	async () => {
		const topic = await _admin.generateTopic();
		console.log(topic);
	},
	{
		scheduled: false,
		timezone: "America/Sao_Paulo",
	}
);
