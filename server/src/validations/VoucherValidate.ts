import { z } from "zod";
import BaseValidate from "./BaseValidate";

const voucherSchema = z.object({
  voucher_name: z.string().min(1, "Tên voucher không được để trống"),
  voucher_start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày bắt đầu không hợp lệ"
  }),
  voucher_end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày kết thúc không hợp lệ"
  }),
  voucher_discount: z.number().min(0).max(100, "Giảm giá phải trong khoảng từ 0 đến 100"),
  voucher_script: z.string()
});
type VoucherType = z.infer<typeof voucherSchema>;
class VoucherValidate extends BaseValidate<VoucherType> {
  protected schema = voucherSchema;
}

export default VoucherValidate;
