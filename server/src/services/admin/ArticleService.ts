import mongoose from "mongoose";
import logger from "../../configs/logger";
import Constants from "../../utils/Constant";
import BaseService from "./BaseService";
import articleModel, { IArticle } from "../../models/schema/articleSchema";
import { IArticleInput } from "../../interfaces/IArticleInput";
class ArticleService extends BaseService<IArticle, IArticleInput> {
  protected model = articleModel;
  protected async checkId(id: string): Promise<void> {
    return;
  }
  public async findArticleById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id article người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model.findOne({ _id: id, deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
  }
}
export default ArticleService;
