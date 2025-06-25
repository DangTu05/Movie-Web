import { update } from "./../../../../CodeClone/backend-we-connect/react-we-connect/backend-we-connect/src/controllers/user.controller";
import cron from "node-cron";
import voucherModel from "../models/schema/voucherSchema";
import logger from "../configs/logger";
// Job tự động cập nhật trạng thái voucher từ "Chưa có hiệu lực" sang "Đang có hiệu lực" và từ "Đang có hiệu lực" sang "Hết hiệu lực" vào lúc 00:00 hàng ngày
cron.schedule("0 0 * * *", async () => {
  try {
    // tránh lỗi UnhandledPromiseRejection
    const now = new Date();
    // Cập nhật trạng thái của voucher sang "đang có hiệu lực"
    const updateStart = await voucherModel.updateMany(
      {
        voucher_start: { $lte: now },
        voucher_end: { $gte: now },
        status: "Chưa có hiệu lực"
      },
      {
        $set: { status: "Đang có hiệu lực" }
      }
    );
    // Cập nhật trạng thái của voucher sang "hết hiệu lực"
    const updateEnd = await voucherModel.updateMany(
      {
        voucher_end: { $lte: now },
        status: "Đang có hiệu lực"
      },
      {
        $set: { status: "Hết hiệu lực" }
      }
    );
    logger.info(
      `[CRON] ✅ Đã cập nhật ${updateStart.modifiedCount} voucher sang 'Đang có hiệu lực' và ${updateEnd.modifiedCount} voucher sang 'Hết hiệu lực' (ngày ${now.toLocaleDateString()})`
    );
  } catch (error) {
    logger.error(`[CRON] ❌ Lỗi cập nhật trạng thái voucher: ${error}`);
  }
});
