/* eslint-disable indent */
// eslint-disable-next-file indent
import fs from "fs";
import path from "path";
import winston from "winston";
import env from "./environment";

// Đảm bảo thư mục logs tồn tại nếu chạy production
const logDir = path.resolve("logs");
if (env.BUILD_MODE === "prod" && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: env.BUILD_MODE === "prod" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const extra = Object.keys(meta).length > 0 ? ` | meta: ${JSON.stringify(meta, null, 2)}` : "";
      return `[${timestamp}] ${level.toUpperCase()}: ${
        stack || (typeof message === "object" ? JSON.stringify(message) : message)
      }${extra}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    ...(env.BUILD_MODE === "prod"
      ? [
          new winston.transports.File({ filename: "logs/error.log", level: "error" }),
          new winston.transports.File({ filename: "logs/combined.log" })
        ]
      : [])
  ]
});

export default logger;
