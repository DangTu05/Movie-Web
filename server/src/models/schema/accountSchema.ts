import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IAccount extends BaseDocument {
  username: string;
  password: string;
  email: string;
  role_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  status: boolean;
}
const accountSchema = new Schema(
  {
    ...baseFields,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);
export default mongoose.model<IAccount>("Account", accountSchema);
export { IAccount, accountSchema };
