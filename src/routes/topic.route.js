import { Router } from "express";
import { TopicsController } from "../controllers/topics.controller";

const router = Router();

router.get("/", TopicsController.getTopics);
router.get("/generate", TopicsController.generateTopic);
router.post("/create", TopicsController.createTopic);
router.put("/updateLast", TopicsController.updateLastTopic);
router.delete("/clean", TopicsController.deleteTopics);

export default router;
