import express from "express";
import topicController from "../../../controllers/admin/topicController";

const router = express.Router();

router.get("/", topicController.getTopic);

export default router;
