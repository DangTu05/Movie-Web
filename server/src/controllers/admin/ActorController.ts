import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import ActorService from "../../services/admin/ActorService";
import sendResponse from "../../utils/handler/response";
import ActorValidate from "../../validations/ActorValidate";
import BaseController from "./BaseController";
const _actorValidate = new ActorValidate();
class ActorController extends BaseController {
  constructor(private readonly actorService: ActorService) {
    super();

    this.createActor = errorHandler.handleAsyncErrors(this.createActor.bind(this));
  }
  async createActor(req: Request, res: Response, next: Function): Promise<void> {
    const actor_image = (req.file as Express.Multer.File)?.path || "";
    req.body.actor_image = actor_image;
    const { success, errors } = _actorValidate.validate(req);
    if (!success) {
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.actorService.createActor(req.body);
    sendResponse(res, 201, null, "Đã tạo thành công!", "Tạo thành công!");
  }
  async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-actor");
  }
}
export default ActorController;
