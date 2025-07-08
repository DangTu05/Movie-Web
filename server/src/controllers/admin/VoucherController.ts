/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import logger from "../../configs/logger";
import VoucherService from "../../services/admin/VoucherService";
import { IVoucherInput } from "../../interfaces/IVoucherInput";
import { IVoucher } from "../../models/schema/voucherSchema";
import VoucherValidate from "../../validations/VoucherValidate";
import { formatDate } from "../../utils/formatDate";
const _voucherValidate = new VoucherValidate();
class VoucherController extends BaseController<VoucherService, IVoucherInput, IVoucher> {
  constructor(private readonly voucherService: VoucherService) {
    super();
  }

  // render view cho việc tạo mới voucher
  // Phương thức này sẽ được gọi khi người dùng truy cập vào /create-voucher
  public async render(req: Request, res: Response) {
    logger.info("Rendering create voucher view");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    const viewName = req.params.view || req.path.replace(/^\/+/, "").split("/")[0]; // lấy view
    switch (viewName) {
      case "create-voucher":
      case "update-voucher":
        data.title = viewName === "create-voucher" ? "Create Voucher" : "Update Voucher";
        if (viewName === "update-voucher") {
          const voucher_id = req.params.id;
          if (!voucher_id) {
            return res.redirect("/admin/vouchers");
          }
          data.voucher = await this.service.findVoucherById(voucher_id);
          if (!data.voucher) {
            return res.redirect("/admin/vouchers");
          }
          data.voucher.voucher_start = formatDate(data.voucher.voucher_start);
          data.voucher.voucher_end = formatDate(data.voucher.voucher_end);
        }
        break;
      default:
        return res.status(404).render("admin/pages/404", { message: "Page not found" });
        // eslint-disable-next-line no-case-declarations
        const actualView = viewName === "update-voucher" || viewName === "create-voucher" ? "create-voucher" : viewName;
        res.render(`admin/pages/${actualView}`, {
          data: data
        });
    }
  }
  protected service: VoucherService = this.voucherService; // Chưa có service cụ thể, cần implement sau
  // Xử lý dữ liệu từ request để tạo voucher
  protected extractDataFromRequest(req: Request) {
    // Tự động khởi tạo trạng thái theo ngày
    const status = this.service.getVoucherStatus(req.body.voucher_start, req.body.voucher_end);
    req.body.status = status;
    return req.body as IVoucher;
  }
  protected validate(req: Request) {
    return _voucherValidate.validate(req);
  }
}
export default VoucherController;
