import { CronJob } from "cron";
import { TopicsAdmin } from "../topics/admin";
import { postTopic } from "../slack";

const _admin = new TopicsAdmin();

const callback = async () => {
	const topic = await _admin.generateTopic();
	await postTopic(topic);
};

export const initCron = new CronJob("0 55 11,17 * * *", callback, {
	scheduled: false,
	timezone: "America/Sao_Paulo",
});
