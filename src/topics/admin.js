import Topic from "./model";
import { getMeeting } from "../utils/meeting";
import { openAiService } from "../openAi/service";

export class TopicsAdmin {
	constructor() {
		if (typeof TopicsAdmin.instance === "object") {
			return TopicsAdmin.instance;
		}

		TopicsAdmin.instance = this;
		return this;
	}

	async getTopics(pageSize = 15) {
		const data = await Topic.find();
		return data.slice(0, pageSize);
	}

	async getTitleTopics(pageSize = 15) {
		const data = await this.getTopics(pageSize);
		return data.map((d) => d.topic);
	}

	async createTopic(topic) {
		const payload = {
			topic,
			meeting: getMeeting(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		return await Topic.create(payload);
	}

	async generateTopic() {
		const lastTitles = await this.getTitleTopics();
		const topic = await openAiService.generateFromHistory(lastTitles);

		await this.createTopic(topic);

		return topic;
	}

	async editTopic(id, title) {
		const data = Topic.findById(id);
		data.title = title;
		data.updatedAt = new Date();
		await Topic.findByIdAndUpdate(id, data);
	}

	async deleteTopics() {
		const data = await Topic.find();
		if (data.length < 15) return new Error("Invalid quantity option");

		return data.slice(0, 15).forEach(async (d) => {
			const id = d._id.toString();
			await Topic.findByIdAndDelete(id);
		});
	}
}
