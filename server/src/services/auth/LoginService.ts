import accountModel from "../../models/schema/accountSchema";
import logger from "../../configs/logger";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import { comparePassword } from "../../utils/passwordUtil";
export class LoginService {
  public async login(username: string, password: string): Promise<void> {
    // Kiểm tra tài khoản có tồn tại hay không
    const account = await accountModel.findOne({ username });
    if (!account) {
      logger.error("Account not found", { username });
      throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại");
    }
    // Kiểm tra mật khẩu
    const isPasswordValid = await comparePassword(password, account.password);
    if (!isPasswordValid) {
      logger.error("Invalid password", { username });
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Mật khẩu không chính xác");
    }
    // Nếu tài khoản và mật khẩu hợp lệ, trả về thông tin tài khoản
    logger.info("Login successful", { username });
  }
}
