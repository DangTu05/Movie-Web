import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
import ActorService from "../../services/admin/ActorService";
import sendResponse from "../../utils/handler/response";
import ActorValidate from "../../validations/ActorValidate";
import BaseController from "./BaseController";
import { IActorInput } from "../../interfaces/IActorInput";
import { IActor } from "../../models/schema/actorSchema";
const _actorValidate = new ActorValidate();
class ActorController extends BaseController<ActorService, IActorInput, IActor> {
  constructor(private readonly actorService: ActorService) {
    super();
  }
  // không cần revide như MovieController vì ActorService đã được inject trực tiếp
  protected service: ActorService = this.actorService;
  // Xử lý dữ liệu từ request để tạo actor
  protected extractDataFromRequest(req: Request): IActorInput {
    const files = (req.file as Express.Multer.File)?.path || "";
    const actor_image = (req.file as Express.Multer.File)?.path || "";
    req.body.actor_image = actor_image;
    return req.body as IActorInput;
  }
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _actorValidate.validate(req);
  }
  async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/create-actor");
  }
}
export default ActorController;
