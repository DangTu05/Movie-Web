import categoryModel from "../../models/schema/categorySchema";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
import BaseService from "./BaseService";
class CategoryService extends BaseService<ICategory, ICategoryInput> {
  protected model = categoryModel;
  public async getAllCategories(): Promise<ICategory[]> {
    return await categoryModel.find({ deleted: false }).sort({ createdAt: -1 });
  }
}
export default CategoryService;
