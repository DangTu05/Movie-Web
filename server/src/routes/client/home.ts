import { Router } from "express";
import HomeController from "../../controllers/client/HomeController";
import { paginationMiddleware } from "../../middlewares/pagination";
import { attachUserFromRefreshToken } from "../../middlewares/attachUserFromRefreshToken.middleware";
const homeController = new HomeController();
const router: Router = Router();
router.get("/home", attachUserFromRefreshToken, paginationMiddleware, homeController.showView);
export default router;
