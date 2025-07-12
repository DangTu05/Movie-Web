import { Router } from "express";
import HomeController from "../../controllers/client/HomeController";
const homeController = new HomeController();
const router: Router = Router();
router.get("/home", homeController.showView);
export default router;
