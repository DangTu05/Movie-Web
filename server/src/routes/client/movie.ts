import { Router } from "express";
const router: Router = Router();
import MovieController from "../../controllers/client/MovieController";
const movieController = new MovieController();
router.get("/movie-detail/:id", movieController.showView);
export default router;
