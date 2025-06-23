import { Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
class CategoryController extends BaseController {
  public async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-category");
  }
}
export default CategoryController;
