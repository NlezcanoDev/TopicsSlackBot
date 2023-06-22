import { Router } from "express";
import { SlackController } from "../controllers/slack.controller";

const router = Router();

// Slack commands
router.post("/prefer", SlackController.preferTopic);

export default router;
