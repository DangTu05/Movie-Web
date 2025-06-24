import { Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
import CategoryService from "../../services/admin/CategoryService";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import sendResponse from "../../utils/handler/response";
import CategoryValidate from "../../validations/CategoryValidate";
const _categoryValidate = new CategoryValidate();
class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
    this.createCategory = errorHandler.handleAsyncErrors(this.createCategory.bind(this));
  }
  public async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-category");
  }
  public async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { success, errors } = _categoryValidate.validate(req);
    if (!success) {
      logger.error("Validation failed", errors);
      return sendResponse(res, StatusCodes.BAD_REQUEST, null, "Validation failed", errors);
    }
    await this.categoryService.createCategory(req.body);
    logger.info("Category created successfully", req.body);
    sendResponse(res, StatusCodes.CREATED, null, "Category created successfully", "Category created successfully");
  }
}
export default CategoryController;
