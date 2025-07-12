import { Request, Response, NextFunction } from "express";
class ArticleController {
  constructor() {}
  public async showView(req: Request, res: Response, next: NextFunction) {
    const data: any = {};
    data.title = "Create Article";
    res.render("admin/pages/create-article", {
      data: data
    });
  }
}
export default ArticleController;
