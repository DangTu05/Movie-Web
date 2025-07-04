import { Router } from "express";
import AccountController from "../controllers/admin/AccountController";
import AccountService from "../services/admin/AccountService";
import RoleService from "../services/admin/RoleService";
const router: Router = Router();
const accountService = new AccountService();
const roleService = new RoleService();
const accountController = new AccountController();
accountController.addRevide("accountService", accountService);
accountController.addRevide("roleService", roleService);
router.get("/:view", accountController.showView);
router.post("/create-account", accountController.create);

export default router;
