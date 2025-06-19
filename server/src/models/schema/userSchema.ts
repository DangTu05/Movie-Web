import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IUser extends BaseDocument {
  user_name: string;
  gender: string;
  birthday: Date;
  phone: string;
  address: string;
  user_image: string;
  reward_points: number;
}
const userSchema = new mongoose.Schema(
  {
    ...baseFields,
    user_name: { type: String },
    gender: {
      type: String,
      enum: {
        values: ["nam", "nữ"],
        message: "Giới tính phải là 'nam' hoặc 'nữ'"
      }
    },
    birthday: { type: Date },
    phone: { type: String },
    address: { type: String },
    user_image: { type: String, default: "" },
    reward_points: { type: Number, default: 0 }
  },
  { timestamps: true }
);
export default mongoose.model<IUser>("User", userSchema);
export { IUser, userSchema };
