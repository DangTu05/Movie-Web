import { Router } from "express";
import ArticleController from "../controllers/admin/ArticleController";
import ArticleService from "../services/admin/ArticleService";
import { uploadImage } from "../middlewares/uploadCloud";

const articleService = new ArticleService();
const articleController = new ArticleController(articleService);
const router: Router = Router();
router.get("/create-article", articleController.showView);
router.get("/update-article/:id", articleController.showView);
router.post("/create-article", uploadImage.single("image"), articleController.create);
router.patch("/update-article/:id", uploadImage.single("image"), articleController.update);

export default router;
