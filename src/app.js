import express from "express";
import morgan from "morgan";

import topicsRoutes from "./topics/routes";

import { init } from "./cohere/service";
import { initCron } from "./cron";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

init();
initCron.start();

// routes
app.use(topicsRoutes);

app.use((req, res) => {
	res.status(404).send("Not found");
});

export default app;
