import { Router } from "express";
import CategoryController from "../controllers/admin/CategoryController";
import CategoryService from "../services/admin/CategoryService";
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);
const router: Router = Router();
router.get("/:view", categoryController.showView);
router.post("/create-category", categoryController.create);
export default router;
