import { Request, Response, NextFunction } from "express";
export async function authentication(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.redirect("/auth/login");
    return;
  }
  next();
}
