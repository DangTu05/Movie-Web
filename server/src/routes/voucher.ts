import { Router } from "express";
import VoucherController from "../controllers/admin/VoucherController";
import VoucherService from "../services/admin/VoucherService";
const voucherService = new VoucherService();
const voucherController = new VoucherController(voucherService);
const router: Router = Router();
router.get("/:view", voucherController.showView);
router.post("/create-voucher", voucherController.create);
export default router;
