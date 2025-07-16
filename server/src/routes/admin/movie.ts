import express, { Router } from "express";
import MovieService from "../../services/MovieService";
import ActorService from "../../services/ActorService";
import MovieController from "../../controllers/admin/MovieController";
import CategoryService from "../../services/CategoryService";
import uploadMedia from "../../middlewares/uploadCloud";
import { handleMulterError } from "../../middlewares/handleMulterError";
import { paginationMiddleware } from "../../middlewares/pagination";
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
router.get("/movies", paginationMiddleware, movieController.showView);
router.get("/create-movie", movieController.showView);
router.get("/update-movie/:id", movieController.showView);
router.post("/create-movie", handleMulterError(uploadMedia), movieController.create);
router.patch("/update-movie/:id", handleMulterError(uploadMedia), movieController.update);
router.delete("/delete-movie/:id", movieController.delete);
export default router;
