import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import { getComingSoonMovies, getNowPlayingMovies } from "../../services/common/movie";
import ArticleService from "../../services/admin/ArticleService";
const _articleService = new ArticleService();
class HomeController {
  constructor() {
    this.showView = errorHandler.handleAsyncErrors(this.showView.bind(this));
  }
  public async showView(req: Request, res: Response, next: NextFunction) {
    const data: any = {};
    req.pagination.limit = 4;
    const [nowPlaying, comingSoon, articles] = await Promise.all([
      getNowPlayingMovies(),
      getComingSoonMovies(),
      _articleService.getAllArticle(req.pagination)
    ]);
    data.comingSoonMovies = comingSoon;
    data.nowPlayingMovies = nowPlaying;
    if (!Array.isArray(articles)) {
      data.articles = articles.articles;
      // data.pagination = articles.pagination;
    }
    data.movies = [...nowPlaying, ...comingSoon];
    res.render("client/pages/home", {
      data: data
    });
  }
}
export default HomeController;
