import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface ICategory extends BaseDocument {
  category_name: string;
}
const categorySchema = new Schema(
  {
    ...baseFields,
    category_name: { type: String, required: true, unique: true }
  },
  {
    timestamps: true
  }
);
export default mongoose.model<ICategory>("Category", categorySchema);
export { ICategory, categorySchema };
