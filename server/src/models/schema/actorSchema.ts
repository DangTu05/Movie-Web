import mongoose, { Schema } from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IActor extends BaseDocument {
  actor_name: string;
  actor_image: string;
  biography: string;
  birthDate: Date;
  gender: string;
  nationality: string;
}
const actorSchema = new Schema(
  {
    ...baseFields,
    actor_name: { type: String, required: true },
    actor_image: { type: String, required: true },
    biography: { type: String },
    birthDate: { type: Date, required: true },
    gender: {
      type: String,
      required: true,
      enum: { values: ["male", "female", "other"], message: "Giới tính phải là male, female hoặc other" }
    },
    nationality: { type: String, required: true }
  },
  { timestamps: true }
);
export default mongoose.model<IActor>("Actor", actorSchema);
export { IActor, actorSchema };
