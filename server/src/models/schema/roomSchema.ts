import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface IRoom extends BaseDocument {
  room_name: string;
  room_number: number;
  chair_total: number;
  format_room?: string;
}
const roomSchema = new mongoose.Schema(
  {
    ...baseFields,
    room_number: { type: Number, required: true },
    chair_total: { type: Number, required: true },
    format_room: { type: String, default: "2D IMAX" }
  },
  {
    timestamps: true
  }
);
export default mongoose.model<IRoom>("Room", roomSchema);
export { IRoom, roomSchema };
