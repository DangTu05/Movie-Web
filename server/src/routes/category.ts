import { Router } from "express";
import CategoryController from "../controllers/admin/CategoryController";
const categoryController = new CategoryController();
const router: Router = Router();
router.get("/create-category", categoryController.showView);
export default router;
