import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import MovieService from "../../services/MovieService";
import ArticleService from "../../services/ArticleService";
const _articleService = new ArticleService();
const _movieService = new MovieService();
class HomeController {
  constructor() {
    this.showView = errorHandler.handleAsyncErrors(this.showView.bind(this));
  }
  public async showView(req: Request, res: Response, next: NextFunction) {
    const data: any = {};
    const _user = res.locals._user;
    if (_user) data.user = _user;
    req.pagination.limit = 4;
    const [nowPlaying, comingSoon, articles] = await Promise.all([
      _movieService.getNowPlayingMovies(),
      _movieService.getComingSoonMovies(),
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
