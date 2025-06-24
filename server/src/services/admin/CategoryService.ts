import categoryModel from "../../models/schema/categorySchema";
import { ICategory } from "../../models/schema/categorySchema";
class CategoryService {
  public async createCategory(categoryData: any): Promise<void> {
    const newCategory = new categoryModel(categoryData);
    await newCategory.save();
  }
  public async getAllCategories(): Promise<ICategory[]> {
    return await categoryModel.find({ deleted: false }).sort({ createdAt: -1 });
  }
}
export default CategoryService;
