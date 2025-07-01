import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import accountModel from "../../models/schema/accountSchema";
import userModel from "../../models/schema/userSchema";
import ApiError from "../../utils/ApiError";
import { hashPassword } from "../../utils/passwordUtil";
export class RegisterService {
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
}
