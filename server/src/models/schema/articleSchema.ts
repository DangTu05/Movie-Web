import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IArticle extends BaseDocument {
  title: string;
  content: string;
  author?: mongoose.Types.ObjectId;
}
const articleSchema = new Schema(
  {
    ...baseFields,
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "User"}
  },
  { timestamps: true }
);
export default mongoose.model<IArticle>("Article", articleSchema);
export { IArticle, articleSchema };
