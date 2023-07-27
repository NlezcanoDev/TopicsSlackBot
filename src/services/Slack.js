import { App } from "@slack/bolt";
import { config } from "dotenv";
import Config from "../models/Config";

config();
const clientId = process.env.SLACK_CLIENT_ID;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const oauthToken = process.env.SLACK_OAUTH_BOT_TOKEN;
const stateSecret = "my-state-secret";
const scopes = ["chat:write", "commands"];

class SlackService {
	/**
	 * @type App<StringIndexed>
	 */
	#slackApp;

	constructor() {
		if (typeof SlackService.instance === "object") {
			return SlackService.instance;
		}

		SlackService.instance = this;
		return this;
	}

	config() {
		this.#slackApp = new App({
			clientId,
			clientSecret,
			signingSecret,
			stateSecret,
			scopes,
		});
	}

	async init() {
		if (!this.#slackApp) {
			this.config();
		}
		this.#slackApp.start(8080);
		console.log("-- slack service connected --");
	}

	async postMessage(text, channel) {
		if (!channel) {
			const { slack } = await Config.findOne();
			channel = slack.channel;
		}

		await this.#slackApp.client.chat.postMessage({
			token: oauthToken,
			channel: channel,
			text,
		});
	}

	async checkChannelList(channel) {
		const list = await this.#slackApp.client.conversations.list();
		return list.channels.find((c) => c === channel).id;
	}
}

export const slackService = new SlackService();
