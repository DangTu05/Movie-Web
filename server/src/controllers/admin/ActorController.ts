/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import ActorService from "../../services/admin/ActorService";
import ActorValidate from "../../validations/ActorValidate";
import BaseController from "./BaseController";
import { IActorInput } from "../../interfaces/IActorInput";
import { IActor } from "../../models/schema/actorSchema";
import { formatDate } from "../../utils/formatDate";
const _actorValidate = new ActorValidate();
class ActorController extends BaseController<ActorService, IActorInput, IActor> {
  constructor(private readonly actorService: ActorService) {
    super();
  }
  // không cần revide như MovieController vì ActorService đã được inject trực tiếp
  protected service: ActorService = this.actorService;
  // Xử lý dữ liệu từ request để tạo actor
  protected extractDataFromRequest(req: Request) {
    const actor_image = (req.file as Express.Multer.File)?.path || req.body.actor_image;
    req.body.actor_image = actor_image;
    return req.body as IActorInput;
  }
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request) {
    return _actorValidate.validate(req);
  }
  async render(req: Request, res: Response) {
    const data: any = {};
    const viewNames = ["create-actor", "update-actor"];
    const viewName = req.params.view;
    if (viewNames.includes(viewName)) {
      data.title = viewName === "create-actor" ? "Create Actor" : "Update Actor";
    }
    if (viewName === "update-actor") {
      const actor_id = req.params.id;
      if (!actor_id) return res.redirect("/admin/actors");
      data.actor = await this.service.findActorById(actor_id);
      if (!data.actor) return res.redirect("/admin/actors");
      data.actor.birthDate = formatDate(data.actor.birthDate);
    }
    const actualView = viewNames.includes(viewName) ? "create-actor" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default ActorController;
