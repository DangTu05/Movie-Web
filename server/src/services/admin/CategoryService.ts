import mongoose from "mongoose";
import categoryModel from "../../models/schema/categorySchema";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
import BaseService from "./BaseService";
import { existCategory } from "../../helpers/existCategory";
import logger from "../../configs/logger";
import Constants from "../../utils/Constant";
class CategoryService extends BaseService<ICategory, ICategoryInput> {
  protected model = categoryModel;
  public async getAllCategories(): Promise<ICategory[]> {
    return await categoryModel.find({ deleted: false }).sort({ createdAt: -1 }).lean();
  }
  protected async checkId(id: string): Promise<void> {
    return await existCategory(id);
  }
  public async findCategoryById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id category người dùng gửi lên không hợp lệ!");
      return;
    }
    const category = await categoryModel
      .findOne({ _id: id, deleted: false })
      .select(Constants.COMMON_SELECT_FIELDS)
      .lean();
    return category;
  }
}
export default CategoryService;
