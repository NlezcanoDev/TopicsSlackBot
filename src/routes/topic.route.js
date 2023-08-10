import { Router } from "express";
import { TopicsController } from "../controllers/topics.controller";

const router = Router();

router.get("/", TopicsController.getTopics);
router.get("/generate", TopicsController.generateTopic);
router.post("/create", TopicsController.createTopic);
router.delete("/clean", TopicsController.deleteTopics);

// Slack commands
router.post("/prefer", TopicsController.updateLastTopic);
router.post("/regenerate", TopicsController.regenerateTopic);
router.post("/specify", TopicsController.specifyLastTopic);

export default router;
