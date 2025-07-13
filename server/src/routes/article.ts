import { Router } from "express";
import ArticleController from "../controllers/admin/ArticleController";
import ArticleService from "../services/admin/ArticleService";
const articleService = new ArticleService();
const articleController = new ArticleController(articleService);
const router: Router = Router();
router.get("/create-article", articleController.showView);
router.post("/create-article", articleController.create);
export default router;
