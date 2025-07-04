import BaseService from "./BaseService";
import voucherModel, { IVoucher } from "../../models/schema/voucherSchema";
import { IVoucherInput } from "../../interfaces/IVoucherInput";
import { existVoucher } from "../../helpers/existVoucher";
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
}
export default VoucherService;
