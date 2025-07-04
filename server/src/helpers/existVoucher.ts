import voucherModel from "../models/schema/voucherSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existVoucher = async (voucherId: string): Promise<void> => {
  const exists = await voucherModel.exists({ _id: voucherId, deleted: false });
  if (!exists) throw new ApiError(StatusCodes.NOT_FOUND, "Voucher không tồn tại");
};
export { existVoucher };
