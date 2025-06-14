import express, { Express } from "express";
import { Server } from "http";
import exitHook from "async-exit-hook";
import path from "path";
import cors from "cors";
import connectDB from "./configs/connectDB";
const app: Express = express();
const port: number | string = 3000;
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

  return app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};
/// anonymous async function(IIFE)
(async (): Promise<void> => {
  try {
    console.log("Connecting to database...");
    // Kết nối đến cơ sở dữ liệu MongoDB
    await connectDB();
    startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
