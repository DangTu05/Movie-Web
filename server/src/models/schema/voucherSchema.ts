import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IVoucher extends BaseDocument {
  voucher_name: string;
  voucher_start: Date;
  voucher_end: Date;
  voucher_discount: number;
  voucher_script: string;
}
const VoucherSchema = new mongoose.Schema(
  {
    ...baseFields,
    voucher_name: {
      type: String,
      required: true
    },
    voucher_start: {
      type: Date,
      required: true
    },
    voucher_end: {
      type: Date,
      required: true
    },
    voucher_discount: {
      type: Number,
      required: true
    },
    voucher_script: {
      type: String
    },
    status: {
      type: String,
      enum: {
        values: ["Chưa có hiệu lực", "Đang có hiệu lực", "hết hiệu lực"],
        message: "Trạng thái không hợp lệ"
      }
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model<IVoucher>("Voucher", VoucherSchema);
export { IVoucher, VoucherSchema };
