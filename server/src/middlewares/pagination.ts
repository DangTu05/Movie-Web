import { NextFunction, Request, Response } from "express";
import { IPagination } from "../interfaces/IPagination";
export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const defaultPagination: IPagination = {
    currentPage: parseInt(String(req.query.page || "1")) === 0 ? 1 : parseInt(String(req.query.page || "1")),
    limit: parseInt(String(req.query.limit || "10")) === 0 ? 10 : parseInt(String(req.query.limit || "10")),
    skip:
      (parseInt(String(req.query.page === "0" ? "1" : req.query.page || "1")) - 1) *
      parseInt(String(req.query.limit === "0" ? "10" : req.query.limit || "10")),
    totalPage: 0,
    count: 0
  };
  req.pagination = defaultPagination;
  next();
};
