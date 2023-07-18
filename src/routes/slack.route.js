import { Router } from "express";
import { SlackController } from "../controllers/slack.controller";

const router = Router();

router.get("/channel", SlackController.getChannels);
router.post("/channel/add", SlackController.addChannel);
router.post("/channel/remove", SlackController.removeChannel);
// TODO ver si se puede cambiar estado del bot

export default router;
