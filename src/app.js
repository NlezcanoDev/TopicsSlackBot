import express from "express";
import morgan from "morgan";

import topicsRoutes from "./topics/routes";

import { init } from "./cohere/service";
import { initCron } from "./cron";
import { openAiService } from "./openAi/service";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init();
openAiService.init();
initCron.start();

// routes
app.use(topicsRoutes);

app.use((_, res) => {
	res.status(404).send("Not found");
});

export default app;
