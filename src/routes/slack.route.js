import { Router } from "express";
import { SlackController } from "../controllers/slack.controller";

const router = Router();

router.get("/channel", SlackController.getChannel);
router.post("/channel/select", SlackController.selectChannel);

export default router;
