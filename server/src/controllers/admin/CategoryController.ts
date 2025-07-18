/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import CategoryService from "../../services/CategoryService";
import CategoryValidate from "../../validations/CategoryValidate";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
const _categoryValidate = new CategoryValidate();
class CategoryController extends BaseController<CategoryService, ICategoryInput, ICategory> {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }
  protected service: CategoryService = this.categoryService;
  // render view cho việc tạo mới category
  // Phương thức này sẽ được gọi khi người dùng truy cập vào /create-category
  public async render(req: Request, res: Response) {
    const data: any = {};
    const viewName = req.path.replace(/^\/+/, "").split("/")[0]; // lấy view
    switch (viewName) {
      case "create-category":
      case "update-category":
        data.title = viewName === "create-category" ? "Create Category" : "Update Category"; // Xác định tiêu đề
        if (viewName === "update-category") {
          const categoryId = req.params.id;
          data.category = await this.service.findCategoryById(categoryId);
          if (!data.category) {
            return res.redirect("/admin/categories");
          }
        }
        break;
      case "categories":
        const result = await this.service.getAllCategory(req.pagination);
        if (!Array.isArray(result)) {
          data.categories = result.categories;
          data.pagination = result.pagination;
        }
        data.title = "Danh sách thể loại";
        break;
    }
    // Xác định view thực tế cần render
    const actualView =
      viewName === "update-category" || viewName === "create-category" ? "create-category" : "categories";
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
  // Xử lý dữ liệu từ request để tạo category
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _categoryValidate.validate(req);
  }
}
export default CategoryController;
