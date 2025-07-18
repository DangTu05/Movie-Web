import { Request, Response, NextFunction } from "express";
import AccountService from "../services/AccountService";
import { verifyToken } from "../utils/jwt";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const _accountService = new AccountService();
export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "Không có token");
  try {
    const decoded = await verifyToken({ token });
    if (typeof decoded !== "object" || !decoded.sub) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }
    const user = await _accountService.findAccountByUsername(decoded.sub);
    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, "Người dùng không tồn tại");
    res.locals._user = user ?? null;
  } catch {
    res.locals._user = null;
  }
  next();
}
