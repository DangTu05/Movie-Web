/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import CategoryService from "../../services/admin/CategoryService";
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
  public async render(req: Request, res: Response) {
    const viewName = req.params.view;
    res.render(`admin/pages/${viewName}`);
  }
  protected service: CategoryService = this.categoryService;
  // Xử lý dữ liệu từ request để tạo category
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _categoryValidate.validate(req);
  }
}
export default CategoryController;
