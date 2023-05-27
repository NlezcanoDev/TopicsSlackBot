import { Router } from "express";
import { TopicsController } from "./controller";

const router = Router();

router.get("/", TopicsController.getTopics);
router.get("/generate", TopicsController.generateTopic);
router.post("/create", TopicsController.createTopic);
router.delete("/clean", TopicsController.deleteTopics);

export default router;
