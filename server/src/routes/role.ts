import { Router } from "express";
import RoleController from "../controllers/admin/RoleController";
import RoleService from "../services/admin/RoleService";
const router: Router = Router();
const roleService = new RoleService();
const roleController = new RoleController(roleService);
router.get("/:view", roleController.showView);
router.post("/create-role", roleController.create);
router.patch("/update-permission", roleController.updatePermission);
export default router;
