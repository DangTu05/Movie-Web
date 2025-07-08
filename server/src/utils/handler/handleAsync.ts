/* eslint-disable no-unused-vars */
/**
 * Định nghĩa riêng một Class ApiError kế thừa class Error sẵn (điều này cần thiết và là Best Practice vì class Error nó là class built-in sẵn)
 */
import { Request, Response, NextFunction } from "express";
/*handleAsyncErrors(fn) giúp tự động bắt lỗi trong các hàm async và truyền lỗi đó đến middleware xử lý lỗi của Express.
✅ Giúp giảm thiểu code try...catch lặp lại trong từng phương thức.
✅ Cải thiện độ ổn định của ứng dụng, tránh việc lỗi làm treo request hoặc crash server.*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  // console.log(fn);
  return async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next);
  };
};
const errorHandler = {
  handleAsyncErrors: handleAsync
};
export default errorHandler;
