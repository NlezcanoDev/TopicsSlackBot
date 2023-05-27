import express from "express";
import morgan from "morgan";

import topicsRoutes from "./topics/routes";

import { initCron } from "./cron";
import { openAiService } from "./openAi/service";
import { slackApp } from "./slack";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

openAiService.init();
initCron.start();

(async () => {
	await slackApp.start(8080);
	console.log("El bot está funcionando!");
})();

// https://developmentareagrupo.slack.com

// routes
app.use(topicsRoutes);

app.use((_, res) => {
	res.status(404).send("Not found");
});

export default app;
