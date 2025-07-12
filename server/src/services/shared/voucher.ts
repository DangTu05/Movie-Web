import voucherModel, { IVoucher } from "../../models/schema/voucherSchema";
import Constants from "../../utils/Constant";
// Danh sách khuyến mãi
const getVouchers = async (): Promise<IVoucher[]> => {
  return await voucherModel
    .find({ deleted: false, status: "Đang có hiệu lực" })
    .select(Constants.COMMON_SELECT_FIELDS)
    .lean();
};
export { getVouchers };
