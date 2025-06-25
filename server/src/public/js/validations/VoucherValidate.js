import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class VoucherValidate {
  static validateCreateVoucher(data) {
    if (
      !data.voucher_name ||
      !data.voucher_start ||
      !data.voucher_end ||
      !data.voucher_discount ||
      !data.voucher_script
    ) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    if (data.voucher_discount < 0 || data.voucher_discount > 100) {
      showInfo("", "Giảm giá phải trong khoảng từ 0 đến 100", "warning");
      return false;
    }
    return true;
  }
}
export default VoucherValidate;
