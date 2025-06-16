import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "../base/BaseDocument";
interface IAccount extends BaseDocument {
  username: string;
  password: string;
  email: string;
  role_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  status: boolean;
}
const AccountSchema = new Schema<IAccount>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role"},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    status: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IAccount>("Account", AccountSchema);
export { IAccount, AccountSchema };
