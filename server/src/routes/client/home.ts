import { Router } from "express";
import HomeController from "../../controllers/client/HomeController";
import { paginationMiddleware } from "../../middlewares/pagination";
const homeController = new HomeController();
const router: Router = Router();
router.get("/home", paginationMiddleware, homeController.showView);
export default router;
