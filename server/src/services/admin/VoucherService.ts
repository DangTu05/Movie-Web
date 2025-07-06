import BaseService from "./BaseService";
import voucherModel, { IVoucher } from "../../models/schema/voucherSchema";
import { IVoucherInput } from "../../interfaces/IVoucherInput";
import { existVoucher } from "../../helpers/existVoucher";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";
import logger from "../../configs/logger";
class VoucherService extends BaseService<IVoucher, IVoucherInput> {
  protected model = voucherModel;
  public getVoucherStatus(startDate: Date, endDate: Date) {
    const now = new Date();
    if (now < new Date(startDate)) return "Chưa có hiệu lực";
    if (now > new Date(endDate)) return "Hết hiệu lực";
    return "Đang có hiệu lực";
  }
  protected async checkId(id: string): Promise<void> {
    return await existVoucher(id);
  }
  public async findVoucherById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id voucher người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model
      .findOne({ _id: id, deleted: false })
      .select("-__v -createdAt -updatedAt -deletedAt -deleted")
      .lean();
  }
}
export default VoucherService;
