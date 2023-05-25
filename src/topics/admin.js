import Topic from "./model";
import { CohereService } from "../cohere/service";

export class TopicsAdmin {
	async getTopics(pageSize = 15) {
		const data = await Topic.find();
		return data.slice(0, pageSize);
	}

	async getTitleTopics(pageSize = 15) {
		const data = await this.getTopics(pageSize);
		return data.map((d) => d.topic);
	}

	async createTopic(topic) {
		return await Topic.create(topic);
	}

	async generateTopic() {
		const lastTitles = await this.getTitleTopics();
		return await CohereService.generateFromHistory(lastTitles);
	}

	async editTopic(id, topic) {
		return await Topic.findByIdAndUpdate(id, topic);
	}

	async editTitleTopic(id, title) {
		const data = Topic.findById(id);
		data.title = title;
		Topic.findByIdAndUpdate(id, data);
	}

	async deleteTopics() {
		const data = await Topic.find();
		if (data.length > 15) {
			return data.slice(15).forEach((d) => Topic.findByIdAndDelete(d._id));
		}
	}
}
