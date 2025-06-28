import { Router } from "express";
import RoleController from "../controllers/admin/RoleController";
const router: Router = Router();
const roleController = new RoleController();
router.get("/create-role", roleController.render);
export default router;
