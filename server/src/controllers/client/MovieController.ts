import { Request, Response } from "express";
import BaseController from "./BaseController";
import MovieService from "../../services/MovieService";
import { formatDate } from "../../utils/formatDate";
const _movieService = new MovieService();
class MovieController extends BaseController {
  // Triển khai phương thức render để hiển thị view cho Movie
  async render(req: Request, res: Response) {
    const data: any = {};
    const id = req.params.id;
    if (!id) {
      res.redirect("/home");
    }
    // Lấy thông tin chi tiết của bộ phim từ MovieService
    const movieDetail = await _movieService.findMovieDetailById(id);
    if (!movieDetail) {
      res.redirect("/home");
      return;
    }
    data.movieDetail = movieDetail;
    // Chuyển đổi ngày phát hành sang định dạng mong muốn
    data.movieDetail.releaseDate = formatDate(movieDetail.releaseDate);

    res.render("client/pages/movie-detail", {
      data: data
    });
  }
}
export default MovieController;
