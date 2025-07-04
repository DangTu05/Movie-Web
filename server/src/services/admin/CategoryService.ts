import categoryModel from "../../models/schema/categorySchema";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
import BaseService from "./BaseService";
import { existCategory } from "../../helpers/existCategory";
class CategoryService extends BaseService<ICategory, ICategoryInput> {
  protected model = categoryModel;
  public async getAllCategories(): Promise<ICategory[]> {
    return await categoryModel.find({ deleted: false }).sort({ createdAt: -1 }).lean();
  }
  protected async checkId(id: string): Promise<void> {
    return await existCategory(id);
  }
  public async findCategoryById(id: string) {
    const category = await categoryModel.findOne({ _id: id, deleted: false }).lean();
    return category;
  }
}
export default CategoryService;
