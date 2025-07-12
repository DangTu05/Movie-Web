import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import { getComingSoonMovies, getNowPlayingMovies } from "../../services/shared/movie";
class HomeController {
  constructor() {
    this.showView = errorHandler.handleAsyncErrors(this.showView.bind(this));
  }
  public async showView(req: Request, res: Response, next: NextFunction) {
    const data: any = {};
    const [nowPlaying, comingSoon] = await Promise.all([getNowPlayingMovies(), getComingSoonMovies()]);
    data.comingSoonMovies = comingSoon;
    data.nowPlayingMovies = nowPlaying;
    data.movies = [...nowPlaying, ...comingSoon];
    res.render("client/pages/home", {
      data: data
    });
  }
}
export default HomeController;
