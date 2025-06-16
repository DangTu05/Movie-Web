import { NextFunction, Request, Response } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import sendResponse from "../../utils/handler/response";
import ValidateAuth from "../../validations/ValidateAuth";
import { RegisterService } from "../../services/auth/RegisterService";
import { StatusCodes } from "http-status-codes";
class RegisterController {
  constructor(private readonly registerService: RegisterService) {
    this.register = errorHandler.handleAsyncErrors(this.register.bind(this));
  }
  public async showViewRegister(req: Request, res: Response): Promise<void> {
    res.render("auth/register");
  }
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Validate input data
    const { success, errors } = ValidateAuth.validateRegister(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.registerService.register(req.body);
    sendResponse(res, StatusCodes.CREATED, null, "User registered successfully", "Registration successful");
  }
}
export default RegisterController;
