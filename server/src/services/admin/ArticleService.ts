import BaseService from "./BaseService";
import articleModel, { IArticle } from "../../models/schema/articleSchema";
import { IArticleInput } from "../../interfaces/IArticleInput";
class ArticleService extends BaseService<IArticle, IArticleInput> {
  protected model = articleModel;
  protected async checkId(id: string): Promise<void> {
    return;
  }
}
export default ArticleService;
