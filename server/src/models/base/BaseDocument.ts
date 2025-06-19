import { Document, Schema } from "mongoose";

interface BaseDocument extends Document {
  deletedAt?: Date;
  deleted: boolean;
}
const baseFields = {
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false }
};
export { baseFields, BaseDocument };
