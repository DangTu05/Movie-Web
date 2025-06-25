import { Router } from "express";
import VoucherController from "../controllers/admin/VoucherController";
const voucherController = new VoucherController();
const router: Router = Router();
router.get("/create-voucher", voucherController.showView);
export default router;
