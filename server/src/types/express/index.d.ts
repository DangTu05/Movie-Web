import { IPagination } from "../interfaces/IPagination";
// Là cách bạn mở rộng (extend) interface Request mặc định của Express trong TypeScript để gắn thêm thuộc tính pagination tùy chỉnh cho mọi request
declare module "express-serve-static-core" {
  interface Request {
    pagination?: IPagination;
  }
}
