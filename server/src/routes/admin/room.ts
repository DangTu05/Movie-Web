import { Router } from "express";
import RoomController from "../../controllers/admin/RoomController";
import RoomService from "../../services/RoomService";
const roomService = new RoomService();
const roomController = new RoomController(roomService);
const router: Router = Router();
router.get("/create-room", roomController.showView);
router.post("/create-room", roomController.create);
export default router;
