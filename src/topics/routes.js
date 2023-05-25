import { Router } from "express";
import { TopicsController } from "./controller";

const router = Router();

router.get("/", TopicsController.getTopics);
router.delete("/clean", TopicsController.deleteTopics);
router.get("/generate", TopicsController.generateTopic);

export default router;
