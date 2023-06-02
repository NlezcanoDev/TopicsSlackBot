import { Router } from "express";
import { TopicsController } from "./controller";

const router = Router();

router.get("/", TopicsController.getTopics);
router.get("/generate", TopicsController.generateTopic);
router.post("/create", TopicsController.createTopic);
router.put("/updateLast", TopicsController.updateTopic);
router.delete("/clean", TopicsController.deleteTopics);

// Slack commands
router.get("/prefer", TopicsController.updateTopic);

export default router;
