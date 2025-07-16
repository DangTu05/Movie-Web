/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import sendResponse from "../../utils/handler/response";
import ValidateAuth from "../../validations/AuthValidate";
import AuthService from "../../services/AuthService";
import { StatusCodes } from "http-status-codes";
class AuthController {
  constructor(private readonly authService: AuthService) {
    this.register = errorHandler.handleAsyncErrors(this.register.bind(this));
    this.login = errorHandler.handleAsyncErrors(this.login.bind(this));
  }
  public async showViewRegister(req: Request, res: Response): Promise<void> {
    res.render("auth/register");
  }
  public async showViewLogin(req: Request, res: Response): Promise<void> {
    res.render("auth/login");
  }
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Validate input data
    const { success, errors } = ValidateAuth.validateRegister(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.authService.register(req.body);
    sendResponse(res, StatusCodes.CREATED, null, "User registered successfully", "Registration successful");
  }
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;
    const { success, errors } = ValidateAuth.validateLogin(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.authService.login(username, password);
    sendResponse(res, 200, null, "Login successful");
  }
}
export default AuthController;
