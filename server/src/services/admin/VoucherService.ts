import BaseService from "./BaseService";
import voucherModel, { IVoucher } from "../../models/schema/voucherSchema";
import { IVoucherInput } from "../../interfaces/IVoucherInput";
import { existVoucher } from "../../helpers/existVoucher";
import mongoose from "mongoose";
import logger from "../../configs/logger";
import Constants from "../../utils/Constant";
class VoucherService extends BaseService<IVoucher, IVoucherInput> {
  protected model = voucherModel;
  public getVoucherStatus(startDate: Date, endDate: Date) {
    const now = new Date();
    if (now < new Date(startDate)) return "Chưa có hiệu lực";
    if (now > new Date(endDate)) return "Hết hiệu lực";
    return "Đang có hiệu lực";
  }
  // Kiểm tra id của voucher có tồn tại hay không
  protected async checkId(id: string): Promise<void> {
    return await existVoucher(id);
  }
  // Tìm voucher theo id
  public async findVoucherById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id voucher người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model.findOne({ _id: id, deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
  }
}
export default VoucherService;
