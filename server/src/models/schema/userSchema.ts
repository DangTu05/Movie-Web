import mongoose from "mongoose";
import { BaseDocument } from "../base/BaseDocument";
interface IUser extends BaseDocument {
  user_name: string;
  gender: string;
  birthday: Date;
  phone: string;
  address: string;
  user_image: string;
  reward_points: number;
}
const UserSchema = new mongoose.Schema<IUser>(
  {
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
    reward_points: { type: Number, default: 0 },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
export { IUser, UserSchema };
