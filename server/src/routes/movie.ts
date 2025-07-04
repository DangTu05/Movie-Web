import express, { Router } from "express";
import MovieService from "../services/admin/MovieService";
import ActorService from "../services/admin/ActorService";
import MovieController from "../controllers/admin/MovieController";
import CategoryService from "../services/admin/CategoryService";
import uploadMedia from "../middlewares/uploadCloud";
import { handleMulterError } from "../middlewares/handleMulterError";
const router: Router = express.Router();
const movieService = new MovieService();
const actorService = new ActorService();
const categoryService = new CategoryService();
const movieController = new MovieController();
// Thêm các dịch vụ vào controller
movieController.addRevide("movieService", movieService);
movieController.addRevide("actorService", actorService);
movieController.addRevide("categoryService", categoryService);
// Các route
router.get("/:view", movieController.showView);
router.get("/:view/:id", movieController.showView);
router.post("/create-movie", handleMulterError(uploadMedia), movieController.create);
router.patch("/update-movie/:id", handleMulterError(uploadMedia), movieController.update);
export default router;
