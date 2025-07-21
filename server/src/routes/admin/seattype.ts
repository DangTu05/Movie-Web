import { Router } from "express";
import SeatTypeController from "../../controllers/admin/SeatTypeController";
import SeatTypeService from "../../services/SeatTypeService";
const seatSercice = new SeatTypeService();
const seatTypeController = new SeatTypeController(seatSercice);
const router = Router();
router.get("/create-seattype", seatTypeController.showView);
router.post("/create-seattype", seatTypeController.create);
export default router;
