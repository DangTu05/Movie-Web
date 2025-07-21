/* eslint-disable indent */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import { IRoomInput } from "../../interfaces/IRoomInput";
import { IRoom } from "../../models/schema/roomSchema";
import RoomValidate from "../../validations/RoomValidate";
import RoomService from "../../services/RoomService";
const _roomValidate = new RoomValidate();
class RoomController extends BaseController<RoomService, IRoomInput, IRoom> {
  constructor(private readonly roomService: RoomService) {
    super();
  }

  protected service: RoomService = this.roomService;
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request) {
    return _roomValidate.validate(req);
  }
  // Xử lý show view
  public async render(req: Request, res: Response) {
    const data: any = {};
    const viewName = req.path.replace(/^\/+/, "").split("/")[0]; // lấy view
    switch (viewName) {
      case "create-room":
      case "update-room":
        data.title = viewName === "create-room" ? "Create Room" : "Update Room";
        if (viewName === "update-room") {
          const room_id = req.params.id;
          if (!room_id) {
            return res.redirect("/admin/rooms");
          }
          data.room = await this.service.findRoomById(room_id);
          if (!data.room) {
            return res.redirect("/admin/rooms");
          }
        }
        break;
    }
    const actualView = viewName === "update-room" || viewName === "create-room" ? "create-room" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default RoomController;
