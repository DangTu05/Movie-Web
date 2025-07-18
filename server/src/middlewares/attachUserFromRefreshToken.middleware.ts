import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import AccountService from "../services/AccountService";
const _accountService = new AccountService();
export async function attachUserFromRefreshToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = await verifyToken({ token });
    if (typeof decoded !== "object" || !decoded.sub) {
      throw new Error("Invalid refresh token");
    }
    const user = await _accountService.findAccountByUsername(decoded.sub);
    res.locals._user = user ?? null;
  } catch {
    res.locals._user = null;
  }
  next();
}
