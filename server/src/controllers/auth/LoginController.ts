import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import sendResponse from "../../utils/handler/response";
import ValidateAuth from "../../validations/ValidateAuth";
import { LoginService } from "../../services/auth/LoginService";
class LoginController {
  constructor(private readonly loginService: LoginService) {
    this.login = errorHandler.handleAsyncErrors(this.login.bind(this));
  }
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;
    const { success, errors } = ValidateAuth.validateLogin(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.loginService.login(username, password);
    sendResponse(res, 200, null, "Login successful");
  }
  public async showViewLogin(req: Request, res: Response): Promise<void> {
    res.render("auth/login");
  }
}
export default LoginController;
