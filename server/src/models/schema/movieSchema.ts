import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IMovie extends BaseDocument {
  title: string;
  description: string;
  genre: string;
  poster: string;
  trailer: string;
  releaseDate: Date;
  duration: number;
  age_permission: number;
  actors: string[];
  status: string;
}
const movieSchema = new Schema(
  {
    ...baseFields,
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    poster: { type: String, required: true },
    trailer: { type: String, required: true },
    releaseDate: { type: Date, required: true, default: Date.now },
    duration: { type: Number, required: true },
    age_permission: { type: Number, required: true },
    actors: [{ type: String }],
    status: {
      type: String,
      required: true,
      enum: { values: ["Sắp chiếu", "Đang chiếu"], message: "Trạng thái không hợp lệ" },
      default: "Sắp chiếu"
    }
  },
  { timestamps: true }
);
export default mongoose.model<IMovie>("Movie", movieSchema);
export { IMovie, movieSchema };
