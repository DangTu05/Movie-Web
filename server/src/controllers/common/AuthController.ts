/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import sendResponse from "../../utils/handler/response";
import ValidateAuth from "../../validations/AuthValidate";
import AuthService from "../../services/AuthService";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { signToken } from "../../utils/jwt";
import { IUserDTO } from "../../interfaces/dto/userDTO";
import { UserResponseDto } from "../../models/dto/userDtoSchema";
import AccountService from "../../services/AccountService";
import { verifyToken } from "../../utils/jwt";
import { IRole } from "../../models/schema/roleSchema";
import { IUser } from "../../models/schema/userSchema";
import RoleService from "../../services/RoleService";
const _accountService = new AccountService();
const _roleService = new RoleService();
class AuthController {
  constructor(private readonly authService: AuthService) {
    this.register = errorHandler.handleAsyncErrors(this.register.bind(this));
    this.login = errorHandler.handleAsyncErrors(this.login.bind(this));
    this.logout = errorHandler.handleAsyncErrors(this.logout.bind(this));
  }
  async showViewRegister(req: Request, res: Response): Promise<void> {
    res.render("auth/register");
  }
  async showViewLogin(req: Request, res: Response): Promise<void> {
    res.render("auth/login");
  }
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Validate input data
    const { success, errors } = ValidateAuth.validateRegister(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    // Lấy ra role user
    const role = await _roleService.getRoleUser("Người Dùng");
    req.body.role_id = role?._id;
    await this.authService.register(req.body);
    sendResponse(res, StatusCodes.CREATED, null, "User registered successfully", "Registration successful");
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;
    const { success, errors } = ValidateAuth.validateLogin(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    const { access_token, refresh_token } = await this.authService.login(username, password);
    // Gửi refreshToken bằng HTTP-only cookie
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    });
    sendResponse(res, 200, { access_token }, "Login successful");
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.redirect("/auth/login");
      return;
    }
    await this.authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    sendResponse(res, StatusCodes.OK, null, "Logout successful");
  }

  async getRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token required");
    }

    let tokenDecoded: JwtPayload;

    try {
      const decoded = await verifyToken(refreshToken);
      if (typeof decoded !== "object" || !decoded.sub) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
      }
      tokenDecoded = decoded;
    } catch (err) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired refresh token");
    }

    const user = await _accountService.findAccountByUsername(tokenDecoded.sub ?? "");
    if (!user) throw new ApiError(404, "User not found");
    // Tạo accessToken + refreshToken mới
    const [access_token, refresh_token] = await signToken({
      payload: { username: user.username }
    });

    // Gửi refreshToken mới bằng HTTP-only cookie
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    });
    sendResponse(res, 200, { access_token }, "Login successful");
  }
}
export default AuthController;
