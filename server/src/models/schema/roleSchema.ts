import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IRole extends BaseDocument {
  role_name: string;
  description: string;
  permissions: Array<string>;
  deletedBy: mongoose.Types.ObjectId[];
  updatedBy: mongoose.Types.ObjectId[];
}
const RoleSchema = new mongoose.Schema(
  {
    ...baseFields,
    role_name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: Array, required: true },
    deletedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    updatedBy: [
      {
        // id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        updatedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);
export default mongoose.model<IRole>("Role", RoleSchema);
export { IRole, RoleSchema };
