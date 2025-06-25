import { Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
import CategoryService from "../../services/admin/CategoryService";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import sendResponse from "../../utils/handler/response";
import CategoryValidate from "../../validations/CategoryValidate";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
const _categoryValidate = new CategoryValidate();
class CategoryController extends BaseController<CategoryService, ICategoryInput, ICategory> {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }
  // render view cho việc tạo mới category
  // Phương thức này sẽ được gọi khi người dùng truy cập vào /create-category
  public async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-category");
  }
  protected service: CategoryService = this.categoryService;
  // Xử lý dữ liệu từ request để tạo category
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _categoryValidate.validate(req);
  }
}
export default CategoryController;
