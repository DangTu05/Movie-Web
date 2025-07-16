import mongoose from "mongoose";
import logger from "../configs/logger";
import Constants from "../utils/Constant";
import BaseService from "./BaseService";
import articleModel, { IArticle } from "../models/schema/articleSchema";
import { IArticleInput } from "../interfaces/IArticleInput";
import { IPagination } from "../interfaces/IPagination";
import { existArticle } from "../helpers/existArticle";
class ArticleService extends BaseService<IArticle, IArticleInput> {
  protected model = articleModel;
  protected async checkId(id: string): Promise<void> {
    return await existArticle(id);
  }
  public async getAllArticle(pagination?: IPagination) {
    if (!pagination) {
      const articles: IArticle[] = await this.model
        .find({ deleted: false })
        .select(Constants.COMMON_SELECT_FIELDS)
        .lean();
      if (articles.length === 0) {
        logger.info("No articles found");
      }
      return articles;
    } else {
      const [articles, count] = await Promise.all([
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
        articles
      };
    }
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
