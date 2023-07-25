import { Router } from "express";
import { CronController } from "../controllers/cron.controller";

const router = Router();

router.post("/omit", CronController.omitTask);
router.post("/postpone", CronController.postponeTask);
router.post("/returnDay", CronController.setReturnDay);

export default router;
