import mongoose from "mongoose";
import { BaseDocument, baseFields } from "../base/BaseDocument";
interface ISetting extends BaseDocument {
  website_name: string;
  email: string;
  hotline: string;
  address: string;
  map: string;
  logo: string;
}
const settingSchema = new mongoose.Schema({
  ...baseFields,
  website_name: { type: String, required: true },
  email: { type: String },
  hotline: { type: String },
  address: { type: String },
  map: { type: String },
  logo: { type: String }
});
export default mongoose.model<ISetting>("Setting", settingSchema);
export { ISetting, settingSchema };
