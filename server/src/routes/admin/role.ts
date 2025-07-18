import { Router } from "express";
import RoleController from "../../controllers/admin/RoleController";
import RoleService from "../../services/RoleService";
import { paginationMiddleware } from "../../middlewares/pagination";
const router: Router = Router();
const roleService = new RoleService();
const roleController = new RoleController(roleService);
router.get("/create-role", roleController.showView);
router.get("/update-role/:id", roleController.showView);
router.get("/roles", paginationMiddleware, roleController.showView);
router.get("/permission", roleController.showView);
router.post("/create-role", roleController.create);
router.patch("/update-role/:id", roleController.update);
router.patch("/update-permission", roleController.updatePermission);
router.delete("/delete-role/:id", roleController.delete);
export default router;
