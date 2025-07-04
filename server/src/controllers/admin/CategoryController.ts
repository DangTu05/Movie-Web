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
    const data: any = {};
    const viewNames = ["create-category", "update-category"];
    const viewName = req.params.view;
    data.title = viewName === "create-category" ? "Create Category" : "Update Category";
    // Xác định view thực tế cần render
    if (viewName === "update-category") {
      const categoryId = req.params.id;
      data.category = await this.service.findCategoryById(categoryId);
      if (!data.category) {
        return res.redirect("/admin/categories");
      }
    }
    // Xác định view thực tế cần render
    const actualView = viewNames.includes(viewName) ? "create-category" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
  protected service: CategoryService = this.categoryService;
  // Xử lý dữ liệu từ request để tạo category
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _categoryValidate.validate(req);
  }
}
export default CategoryController;
