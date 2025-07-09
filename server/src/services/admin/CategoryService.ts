import mongoose from "mongoose";
import categoryModel from "../../models/schema/categorySchema";
import { ICategory } from "../../models/schema/categorySchema";
import { ICategoryInput } from "../../interfaces/ICategoryInput";
import BaseService from "./BaseService";
import { existCategory } from "../../helpers/existCategory";
import logger from "../../configs/logger";
import Constants from "../../utils/Constant";
import { IPagination } from "../../interfaces/IPagination";
class CategoryService extends BaseService<ICategory, ICategoryInput> {
  protected model = categoryModel;
  public async getAllCategory(pagination?: IPagination) {
    if (!pagination) {
      const categories: ICategory[] = await this.model
        .find({ deleted: false })
        .select(Constants.COMMON_SELECT_FIELDS)
        .lean();
      if (categories.length === 0) {
        logger.info("No categories found");
      }
      return categories;
    } else {
      const [categories, count] = await Promise.all([
        this.model
          .find({ deleted: false })
          .select(Constants.COMMON_SELECT_FIELDS)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .lean(),
        this.model.countDocuments({ deleted: false })
      ]);
      pagination.count = count;
      pagination.totalPage = Math.ceil(count / pagination.limit);
      return {
        pagination: {
          ...pagination
        },
        categories
      };
    }
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
