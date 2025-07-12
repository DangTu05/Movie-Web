import { Router } from "express";
import ArticleController from "../controllers/admin/ArticleController";
const articleController = new ArticleController();
const router: Router = Router();
router.get("/create-article", articleController.showView);
export default router;
