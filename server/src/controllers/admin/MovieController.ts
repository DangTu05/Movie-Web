import { Request, Response, NextFunction } from "express";
import MovieValidate from "../../validations/MovieValidate";
import sendResponse from "../../utils/handler/response";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import BaseController from "./BaseController";
import MovieService from "../../services/admin/MovieService";
import { IMovieInput } from "../../interfaces/IMovieInput";
import { IMovie } from "../../models/schema/movieSchema";
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
  protected extractDataFromRequest(req: Request): IMovieInput {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    req.body.actors = Array.isArray(req.body.actor) ? req.body.actor : req.body.actor ? [req.body.actor] : [];
    const posterUrl = files["poster"]?.[0]?.path || "";
    const trailerUrl = files["trailer"]?.[0]?.path || "";
    req.body.poster = posterUrl;
    req.body.trailer = trailerUrl;
    req.body.status = this.service.getMovieStatus(req.body.releaseDate);
    return req.body as IMovieInput;
  }
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _movieValidate.validate(req);
  }
  // Phương thức này sẽ hiển thị view tương ứng với controller
  public async render(req: Request, res: Response): Promise<void> {
    logger.info("Fetching all actors for create movie view");
    const actors = await this.revides["actorService"].getAllActor();
    const categories = await this.revides["categoryService"].getAllCategories();
    res.render("admin/pages/create-movie", {
      actors: actors ?? [],
      categories: categories ?? []
    });
  }
}
export default MovieController;
