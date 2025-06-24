import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
class AuthValidate {
  public static userSchema = z.object({
    username: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateLogin(reqbody: Request): { success: boolean; errors?: any } {
    const { username, password } = reqbody.body;
    if (!username || !password) {
      return {
        success: false,
        errors: { username: "Tên đăng nhập không được để trống", password: "Mật khẩu không được để trống" }
      };
    }
    return { success: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateRegister(reqbody: Request): { success: boolean; errors?: any } {
    const result = AuthValidate.userSchema.safeParse(reqbody.body);
    if (!result.success) {
      // Format lỗi Zod về dạng dễ xử lý
      const errors = formatZodErrors(result.error);
      logger.error("Validation errors:", errors);
      return { success: false, errors };
    }
    return { success: true };
  }
}
export default AuthValidate;
