/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
import { IArticleInput } from "../../interfaces/IArticleInput";
import { IArticle } from "../../models/schema/articleSchema";
import ArticleService from "../../services/admin/ArticleService";
import ArticleValidate from "../../validations/ArticleValidate";
const _articleValidate = new ArticleValidate();
class ArticleController extends BaseController<ArticleService, IArticleInput, IArticle> {
  constructor(private readonly articleService: ArticleService) {
    super();
  }
  protected service: ArticleService = this.articleService;
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _articleValidate.validate(req);
  }
  protected extractDataFromRequest(req: Request) {
    const image = (req.file as Express.Multer.File)?.path || req.body.image;
    req.body.image = image;
    return req.body as IArticleInput;
  }
  public async render(req: Request, res: Response) {
    const data: any = {};
    const viewName = req.path.replace(/^\/+/, "").split("/")[0]; // lấy view
    switch (viewName) {
      case "create-article":
      case "update-article":
        data.title = viewName === "create-article" ? "Create Article" : "Update Article";
        if (viewName === "update-article") {
          const article_id = req.params.id;
          if (!article_id) {
            return res.redirect("/admin/articles");
          }
          data.article = await this.service.findArticleById(article_id);
          if (!data.article) {
            return res.redirect("/admin/articles");
          }
        }
        break;
      case "articles":
        const result = await this.service.getAllArticle(req.pagination);
        if (!Array.isArray(result)) {
          data.articles = result.articles;
          data.pagination = result.pagination;
        }
        data.title = "Danh sách bài viết";
        break;
    }
    const actualView = viewName === "update-article" || viewName === "create-article" ? "create-article" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default ArticleController;
