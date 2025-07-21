/* eslint-disable indent */
import { Request, Response } from "express";
import { ISeatTypeInput } from "../../interfaces/ISeatTypeInput";
import { ISeatType } from "../../models/schema/seattypeSchema";
import BaseController from "./BaseController";
import SeatTypeService from "../../services/SeatTypeService";
import SeatTypeValidate from "../../validations/SeattypeValidate";
const _seatTypeValidate = new SeatTypeValidate();
class SeatTypeController extends BaseController<SeatTypeService, ISeatTypeInput, ISeatType> {
  constructor(private readonly seatTypeService: SeatTypeService) {
    super();
  }
  protected service: SeatTypeService = this.seatTypeService;
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _seatTypeValidate.validate(req);
  }
  async render(req: Request, res: Response) {
    const data: any = {};
    const viewName = req.path.replace(/^\/+/, "").split("/")[0]; // lấy view
    switch (viewName) {
      case "create-seattype":
      case "update-seattype":
        data.title = viewName === "create-seattype" ? "Create SeatType" : "Update SeatType";
        if (viewName === "update-seattype") {
          const seattype_id = req.params.id;
          if (!seattype_id) {
            return res.redirect("/admin/seattypes");
          }
          // data.seattype = this.service.findSeatTypeById(seattype_id);
          if (!data.seattype) {
            return res.redirect("/admin/seattypes");
          }
        }
        break;
      case "seattype":
        data.title = "Danh sách loại ghế";
        break;
    }
    const actualView = viewName === "update-seattype" || viewName === "create-seattype" ? "create-seattype" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default SeatTypeController;
