// import Slackbots from "slackbots";
import { App } from "@slack/bolt";
import { config } from "dotenv";

config();

// Read a token from the environment variables
const clientId = process.env.SLACK_CLIENT_ID;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const oauthToken = process.env.SLACK_OAUTH_BOT_TOKEN;

// export const slackApp = new Slackbots({
// 	token: token,
// 	signingSecret: signingSecret,
// });

export const slackApp = new App({
	clientId,
	clientSecret,
	signingSecret,
	stateSecret: "my-state-secret",
	scopes: ["chat:write", "commands"],
});

export const postTopic = async (topic) => {
	await slackApp.client.chat.postMessage({
		token: oauthToken,
		channel: "C05AAL38CD6",
		text: `La temática de esta daily es ${topic}`,
	});
};

// slackApp.client.chat.postMessage({
// 	token: oauthToken,
// 	channel: "C05AAL38CD6",
// 	text: "Hola mundo",
// });
