import { Router } from "express";
import { CronController } from "../controllers/cron.controller";

const router = Router();

router.post("/start", CronController.startCronjob);
router.post("/stop", CronController.stopCronjob);
router.post("/restart", CronController.restartCronjob);

// Slack commands
router.post("/omit", CronController.omitTask);
router.post("/postpone", CronController.postponeTask);
router.post("/returnDay", CronController.setReturnDay);

export default router;
