import accountModel from "../models/schema/accountSchema";
import logger from "../configs/logger";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { comparePassword } from "../utils/passwordUtil";
import userModel from "../models/schema/userSchema";
import { hashPassword } from "../utils/passwordUtil";
import { signToken } from "../utils/jwt";
import { TokenType } from "../constants/enum";
import { existUsername } from "../helpers/existUsername";
import refreshTokenModel from "../models/schema/refreshTokenSchema";

class AuthService {
  // Đăng kí tài khoản
  async register(account: { username: string; email: string; password: string }) {
    // Kiểm tra email có tồn tại hay chưa
    const existingAccount = await accountModel.findOne({ email: account.email });
    if (existingAccount) {
      logger.error("Email already exists", { email: account.email });
      throw new ApiError(StatusCodes.CONFLICT, "Email đã được sử dụng");
    }
    // Kiểm tra username có tồn tại hay chưa
    await existUsername(account.username);
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
  async login(username: string, password: string) {
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
    const [access_token, refresh_token] = await this.signToken(username);
    await this.saveRefreshToken(username, refresh_token);
    return {
      access_token,
      refresh_token
    };
  }
  // Đăng xuất
  async logout(refreshToken: string) {
    await this.revokeToken(refreshToken);
  }
  // Sign accesstoken
  private async signAccessToken(username: string) {
    return signToken({
      payload: { username, sub: username, type: TokenType.AccessToken }
    });
  }
  // Sign refreshtoken
  private async signRefreshToken(username: string) {
    return signToken({
      payload: { username, sub: username, type: TokenType.RefreshToken }
    });
  }
  // Sign token
  private signToken(username: string) {
    return Promise.all([this.signAccessToken(username), this.signRefreshToken(username)]);
  }
  // save refreshToken
  async saveRefreshToken(username: string, refreshToken: string) {
    await refreshTokenModel.create({ username, token: refreshToken });
  }
  // delete refreshToken
  async revokeToken(refreshToken: string) {
    return await refreshTokenModel.deleteOne({ refreshToken });
  }
}
export default AuthService;
