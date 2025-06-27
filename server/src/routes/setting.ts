import { Router } from "express";
import SettingController from "../controllers/admin/SettingController";
const router: Router = Router();
const settingController = new SettingController();
router.get("/", settingController.render);
export default router;