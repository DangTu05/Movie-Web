/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import logger from "../../configs/logger";
import VoucherService from "../../services/admin/VoucherService";
import { IVoucherInput } from "../../interfaces/IVoucherInput";
import { IVoucher } from "../../models/schema/voucherSchema";
import VoucherValidate from "../../validations/VoucherValidate";
const _voucherValidate = new VoucherValidate();
class VoucherController extends BaseController<VoucherService, IVoucherInput, IVoucher> {
  constructor(private readonly voucherService: VoucherService) {
    super();
  }

  // render view cho việc tạo mới voucher
  // Phương thức này sẽ được gọi khi người dùng truy cập vào /create-voucher
  public async render(req: Request, res: Response) {
    logger.info("Rendering create voucher view");
    const viewName = req.params.view;
    res.render(`admin/pages/${viewName}`);
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
