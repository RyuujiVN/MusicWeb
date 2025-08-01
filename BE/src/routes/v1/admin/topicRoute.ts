import { Router } from "express";
import * as controller from "../../../controllers/admin/topicController";

const router: Router = Router();

router.get("/", controller.getTopic);

export default router;
