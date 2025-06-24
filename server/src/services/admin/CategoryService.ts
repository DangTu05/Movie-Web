import categoryModel from "../../models/schema/categorySchema";
class CategoryService {
  public async createCategory(categoryData: any): Promise<void> {
    const newCategory = new categoryModel(categoryData);
    await newCategory.save();
  }
}
export default CategoryService;
