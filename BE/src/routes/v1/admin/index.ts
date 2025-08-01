import express from "express";
import topicRoute from "./topicRoute";

const router = express.Router();

router.use("/topic", topicRoute);

export default router;
