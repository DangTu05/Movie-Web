import accountModel from "../models/schema/accountSchema";
import logger from "../configs/logger";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { comparePassword } from "../utils/passwordUtil";
import userModel from "../models/schema/userSchema";
import { hashPassword } from "../utils/passwordUtil";

class AuthService {
  // Đăng kí tài khoản
  public async register(account: { username: string; email: string; password: string }) {
    // Kiểm tra email có tồn tại hay chưa
    const existingAccount = await accountModel.findOne({ email: account.email });
    if (existingAccount) {
      logger.error("Email already exists", { email: account.email });
      throw new ApiError(StatusCodes.CONFLICT, "Email đã được sử dụng");
    }
    /// Mã hóa mật khẩu trước khi lưu vào DataBase
    const passwordHashed = await hashPassword(account.password);
    // Tạo user mới
    const newUser = new userModel();
    await newUser.save();
    const newAccount = new accountModel({ ...account, user_id: newUser._id, password: passwordHashed });
    await newAccount.save();
    logger.info("New account created successfully", {
      username: newAccount.username,
      email: newAccount.email
    });
  }
  // Đăng nhập
  public async login(username: string, password: string) {
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
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Mật khẩu không chính xác!");
    }
    // Nếu tài khoản và mật khẩu hợp lệ, trả về thông tin tài khoản
    logger.info("Login successful", { username });
  }
}
export default AuthService;
