/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import MovieValidate from "../../validations/MovieValidate";
import logger from "../../configs/logger";
import BaseController from "./BaseController";
import MovieService from "../../services/admin/MovieService";
import { IMovieInput } from "../../interfaces/IMovieInput";
import { IMovie } from "../../models/schema/movieSchema";
import { formatDate } from "../../utils/formatDate";
const _movieValidate = new MovieValidate();
class MovieController extends BaseController<MovieService, IMovieInput, IMovie> {
  // revide là các dịch vụ sẽ được inject vào MovieController
  // Ví dụ: MovieService, ActorService, CategoryService..
  private revides: any = {};
  // Chúng ta sẽ gán service sau khi thêm revide
  protected service!: MovieService; // Chắn chắn gán sau khi thêm revide
  constructor() {
    super();
  }
  // Phương thức này sẽ được gọi để thêm các dịch vụ vào MovieController
  // Ví dụ: MovieService, ActorService, CategoryService...
  public addRevide(key: string, revide: any) {
    this.revides[key] = revide;
    // Gán service nếu revide là MovieService
    if (revide instanceof MovieService) {
      this.service = revide;
    }
  }
  // Xử lý dữ liệu từ request để tạo movie
  protected extractDataFromRequest(req: Request) {
    const files = (req.files as { [fieldname: string]: Express.Multer.File[] }) || {};
    req.body.actors = Array.isArray(req.body.actor) ? req.body.actor : req.body.actor ? [req.body.actor] : [];
    const posterUrl = files["poster"]?.[0]?.path || req.body.poster;
    const trailerUrl = files["trailer"]?.[0]?.path || req.body.trailer;
    req.body.poster = posterUrl;
    req.body.trailer = trailerUrl;
    req.body.status = this.service.getMovieStatus(req.body.releaseDate);
    return req.body as IMovieInput;
  }
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request) {
    return _movieValidate.validate(req);
  }
  // Phương thức này sẽ hiển thị view tương ứng với controller
  public async render(req: Request, res: Response) {
    logger.info("Fetching all actors for create movie view");
    const data: any = {};
    const viewName = req.path.replace(/^\/+/, "").split("/")[0]; // lấy view vd:"/update-movie/123" => "update-movie"
    switch (viewName) {
      case "create-movie":
      case "update-movie":
        data.actors = await this.revides["actorService"].getAllActor();
        data.categories = await this.revides["categoryService"].getAllCategory();
        data.title = viewName === "create-movie" ? "Create Movie" : "Update Movie";
        if (viewName === "update-movie") {
          const movieId = req.params.id;
          data.movie = await this.service.findMovieById(movieId);
          if (!data.movie) return res.redirect("/admin/movies");
          data.movie.releaseDate = formatDate(data.movie.releaseDate);
        }
        break;
      case "movies":
        // eslint-disable-next-line no-case-declarations
        const { pagination, movies } = await this.service.getAllMovie(req.pagination);
        data.movies = movies;
        data.pagination = pagination;
        data.title = "Danh sách phim";
        break;
      default:
        return res.status(404).render("admin/pages/404", { message: "Page not found" });
    }
    // Xác định view thực tế cần render
    const actualView = viewName === "update-movie" || viewName === "create-movie" ? "create-movie" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default MovieController;
