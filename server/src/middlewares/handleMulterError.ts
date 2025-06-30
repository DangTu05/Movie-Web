/* eslint-disable @typescript-eslint/no-explicit-any */
import { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";

// Gói middleware multer và xử lý lỗi
export function handleMulterError(uploadMiddleware: any) {
  return function (req: Request, res: Response, next: NextFunction): void {
    uploadMiddleware(req, res, function (err: any): void {
      if (err instanceof MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({ error: "File quá lớn! Giới hạn 20MB." });
        } else {
          res.status(400).json({ error: err.message });
        }
      } else if (err) {
        res.status(500).json({ error: "Lỗi upload không xác định." });
      } else {
        next(); // Không có lỗi, cho đi tiếp
      }
    });
  };
}
