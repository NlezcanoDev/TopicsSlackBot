import express from "express";
import morgan from "morgan";

import topicsRoutes from "./topics/routes";
import slackRoutes from "./slack/routes";

import { initCron } from "./cron";
import { openAiService } from "./openAi/service";
import { SlackApiService } from "./slack/service";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

openAiService.init();
SlackApiService.init();
initCron.start();

// routes
app.use("/api/topics", topicsRoutes);
app.use("/api/slack", slackRoutes);

app.use((_, res) => {
	res.status(404).send("Not found");
});

export default app;
