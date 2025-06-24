import { Request, Response, NextFunction } from "express";
import MovieValidate from "../../validations/MovieValidate";
import sendResponse from "../../utils/handler/response";
import errorHandler from "../../utils/handler/handleAsync";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import BaseController from "./BaseController";
const _movieValidate = new MovieValidate();
class MovieController extends BaseController {
  private revides: any[] = [];
  constructor() {
    super();
    this.createMovie = errorHandler.handleAsyncErrors(this.createMovie.bind(this));
  }
  public addRevide(revide: any) {
    this.revides.push(revide);
  }
  public async createMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    req.body.actors = Array.isArray(req.body.actor) ? req.body.actor : req.body.actor ? [req.body.actor] : [];
    const posterUrl = files["poster"]?.[0]?.path || "";
    const trailerUrl = files["trailer"]?.[0]?.path || "";
    req.body.poster = posterUrl;
    req.body.trailer = trailerUrl;
    const { success, errors } = _movieValidate.validate(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.revides[0].createMovie(req.body);
    sendResponse(res, StatusCodes.CREATED, null, "Đã tạo thành công!", "Tạo thành công!");
  }
  public async render(req: Request, res: Response): Promise<void> {
    logger.info("Fetching all actors for create movie view");
    const actors = await this.revides[1].getAllActor();
    const categories = await this.revides[2].getAllCategories();
    res.render("admin/pages/create-movie", {
      actors: actors ?? [],
      categories: categories ?? []
    });
  }
}
export default MovieController;
