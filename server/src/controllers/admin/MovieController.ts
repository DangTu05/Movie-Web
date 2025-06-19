import { Request, Response, NextFunction } from "express";
import { MovieService } from "../../services/admin/MovieService";
import ValidateMovie from "../../validations/ValidateMovie";
import sendResponse from "../../utils/handler/response";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";

class MovieController {
  constructor(private readonly movieService: MovieService) {
    this.createMovie = errorHandler.handleAsyncErrors(this.createMovie.bind(this));
  }
  public async showViewCreateMovie(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-movie");
  }
  public async createMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const posterUrl = files["poster"]?.[0]?.path || "";
    const trailerUrl = files["trailer"]?.[0]?.path || "";
    req.body.poster = posterUrl;
    req.body.trailer = trailerUrl;
    const { success, errors } = ValidateMovie.validateCreateMovie(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.movieService.createMovie(req.body);
    sendResponse(res, StatusCodes.CREATED, null, "Đã tạo thành công!", "Tạo thành công!");
  }
}
export default MovieController;
