import { Router } from "express";
import topicRoute from "./topicRoute";

const router: Router = Router();

router.use("/topic", topicRoute);

export default router;
