import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";

interface ISeatType extends BaseDocument {
  seat_type: string;
}
const seattypeSchema = new mongoose.Schema(
  {
    ...baseFields,
    seat_type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model<ISeatType>("SeatType", seattypeSchema);
export { ISeatType, seattypeSchema };
