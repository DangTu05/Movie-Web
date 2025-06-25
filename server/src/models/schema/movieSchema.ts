import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
type ObjectId = mongoose.Types.ObjectId;
interface IMovie extends BaseDocument {
  title: string;
  description?: string;
  genre: ObjectId; // Reference to Category
  poster: string;
  trailer: string;
  releaseDate: Date;
  duration: number;
  age_permission: number;
  actors?: ObjectId[]; // Array of references to Actor
  status: "Sắp chiếu" | "Đang chiếu" | "Kết thúc"; // Enum for movie status
}

const movieSchema = new Schema(
  {
    ...baseFields,
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    poster: { type: String, required: true },
    trailer: { type: String, required: true },
    releaseDate: { type: Date, required: true, default: Date.now },
    duration: { type: Number, required: true },
    age_permission: { type: Number, required: true },
    actors: [{ type: mongoose.Types.ObjectId, ref: "Actor" }],
    status: {
      type: String,
      required: true,
      enum: { values: ["Sắp chiếu", "Đang chiếu", "Kết thúc"], message: "Trạng thái không hợp lệ" },
      default: "Sắp chiếu"
    }
  },
  { timestamps: true }
);
export default mongoose.model<IMovie>("Movie", movieSchema);
export { IMovie, movieSchema };
