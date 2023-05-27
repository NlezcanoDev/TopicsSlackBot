import { Router } from "express";
import { SlackController } from "./controller";

const router = Router();

router.post("/", SlackController.chanllenge);

export default router;
