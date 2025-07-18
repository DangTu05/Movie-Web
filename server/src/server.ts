import express, { Express } from "express";
import { Server } from "http";
// import SettingService from "./services/admin/SettingService";
// import exitHook from "async-exit-hook";
import logger from "./configs/logger";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/connectDB";
import routerAdmin from "./routes/admin/index";
import routerClient from "./routes/client/index";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware";
import systemConfig from "./configs/system";
import { uploadImage } from "./middlewares/uploadCloud";
import { uploadImageForTinymce } from "./controllers/common/uploadController";
import "./jobs/autoUpdateMovie"; // Import cron job to auto update movie status
import "./jobs/autoUpdateVoucher"; // Import cron job to auto update voucher status
const app: Express = express();
const port: number | string = 5000;
import configViewEngine from "./configs/viewEngine";
const startServer = (): Server => {
  app.use(cors());
  // Middleware xử lý cookie
  app.use(cookieParser());
  // Middleware xử lý JSON
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));
  // Cấu hình view engine
  configViewEngine(app);
  // Kết nối các file tĩnh
  app.use(express.static(path.join(__dirname, "public")));
  /// tinymce
  const rootPath = path.resolve(__dirname, "..", "..");
  app.use("/tinymce", express.static(path.join(rootPath, "node_modules", "tinymce")));
  // Xử lý upload ảnh ở tinymce
  app.post("/upload-image", uploadImage.single("file"), uploadImageForTinymce);
  // Kết nối các router
  routerAdmin(app);
  routerClient(app);
  // Xử lý nếu người dùng nhập đường dẫn ko tồn tại
  app.get(/(.*)/, (req, res) => {
    res.send("404 Not Found");
  });
  //Xử lý lỗi tập trung
  //* app locals variable
  app.locals.prefixAdmin = systemConfig.prefixAdmin;
  // (async () => {
  //   const setting = await settingService.getSetting();
  //   app.locals.setting = setting;
  // })();

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
