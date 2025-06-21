import { Router } from "express";
import ActorController from "../controllers/admin/ActorController";
const actorController = new ActorController();
const router: Router = Router();
router.get("/create-actor", actorController.showViewCreateActor);
export default router;
