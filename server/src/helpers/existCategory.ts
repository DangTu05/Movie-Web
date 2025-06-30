import categoryModel from "../models/schema/categorySchema";
const existCategory = async (categoryId: string): Promise<boolean> => {
  const category = await categoryModel.findById(categoryId).select("_id").lean(); // Convert Mongoose Document to Plain JavaScript Object
  if (!category) {
    return false;
  }
  return true;
};

export { existCategory };
