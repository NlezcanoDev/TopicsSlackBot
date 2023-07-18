import { App } from "@slack/bolt";
import { config } from "dotenv";

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
		await this.#slackApp.client.chat.postMessage({
			token: oauthToken,
			channel: channel || process.env.SLACK_CHANNEL,
			text,
		});
	}

	async receiveCommand(commmand, callback) {
		this.#slackApp.command(commmand, async (command, ack, say) => {
			await ack();

			const messageResponse = callback(command);
			await say(messageResponse);
		});
	}
}

export const slackService = new SlackService();

/*
channel: "C05AAL38CD6",
text: `La temática de esta daily es ${message}`,
*/
