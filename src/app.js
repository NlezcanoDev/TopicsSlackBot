import express from "express";
import { errorHandler } from "./middlewares/errorHandler";

import topicsRoutes from "./routes/topic.route";
import slackRoutes from "./routes/slack.route";
import cronjobRoutes from "./routes/cron.route";

import { openAiService } from "./services/OpenAi";
import { slackService } from "./services/Slack";
import { cronJobService } from "./services/CronJobs";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

openAiService.init();
slackService.init();
cronJobService.init();

// routes
app.use("/api/topics", topicsRoutes);
app.use("/api/slack", slackRoutes);
app.use("/api/cronjob", cronjobRoutes);

app.use((_, res) => res.status(404).send("Not found"));

app.use(errorHandler);

export default app;
