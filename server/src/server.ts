import express, { Express } from "express";
import { Server } from "http";
import exitHook from "async-exit-hook";
import logger from "./configs/logger";
import path from "path";
import cors from "cors";
import connectDB from "./configs/connectDB";
import router from "./routes/index";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware";
import systemConfig from "./configs/system";
import "./jobs/autoUpdateMovie"; // Import cron job to auto update movie status
import "./jobs/autoUpdateVoucher"; // Import cron job to auto update voucher status
const app: Express = express();
const port: number | string = 5000;
import configViewEngine from "./configs/viewEngine";
const startServer = (): Server => {
  app.use(cors());
  // Middleware xử lý JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Cấu hình view engine
  configViewEngine(app);
  // Kết nối các file tĩnh
  app.use(express.static(path.join(__dirname, "public")));
  // Kết nối các router
  router(app);
  //Xử lý lỗi tập trung
  //* app locals variable
  app.locals.prefixAdmin = systemConfig.prefixAdmin;
  app.use(errorHandlingMiddleware);
  return app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
  });
};
/// anonymous async function(IIFE)
(async (): Promise<void> => {
  try {
    logger.info("Connecting to database...");
    // Kết nối đến cơ sở dữ liệu MongoDB
    await connectDB();
    startServer();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
