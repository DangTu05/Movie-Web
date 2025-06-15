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
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${typeof message === "object" ? JSON.stringify(message) : message}`;
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
