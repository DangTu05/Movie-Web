import { Request, Response, NextFunction } from "express";
import MovieService from "../../services/admin/MovieService";
import ActorService from "../../services/admin/ActorService";
import ValidateMovie from "../../validations/ValidateMovie";
import sendResponse from "../../utils/handler/response";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import BaseController from "./BaseController";

class MovieController extends BaseController {
  constructor(
    private readonly movieService: MovieService,
    private readonly actorService: ActorService
  ) {
    super();
    this.createMovie = errorHandler.handleAsyncErrors(this.createMovie.bind(this));
  }
  public async createMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    req.body.actors = Array.isArray(req.body.actor) ? req.body.actor : req.body.actor ? [req.body.actor] : [];
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
  public async render(req: Request, res: Response): Promise<void> {
    logger.info("Fetching all actors for create movie view");
    const actors = await this.actorService.getAllActor();
    res.render("admin/pages/create-movie", {
      actors: actors ?? []
    });
  }
}
export default MovieController;
