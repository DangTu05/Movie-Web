import cron from "node-cron";
import movieModel from "../models/schema/movieSchema";
import logger from "../configs/logger";
// Job tự động cập nhật trạng thái phim từ "Sắp chiếu" sang "Đang chiếu" vào lúc 00:00 hàng ngày
// Chỉ cập nhật những phim có ngày phát hành trong ngày hiện tại
cron.schedule("0 0 * * *", async () => {
  try {
    // tránh lỗi UnhandledPromiseRejection
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const result = await movieModel.updateMany(
      {
        status: "Sắp chiếu",
        releaseDate: {
          $gte: startOfToday,
          $lt: endOfToday
        }
      },
      {
        $set: { status: "Đang chiếu" }
      }
    );

    logger.info(
      `[CRON] ✅ Đã cập nhật ${result.modifiedCount} phim sang 'Đang chiếu' (ngày ${now.toLocaleDateString()})`
    );
  } catch (error) {
    logger.error(`[CRON] ❌ Lỗi cập nhật trạng thái phim: ${error}`);
  }
});
