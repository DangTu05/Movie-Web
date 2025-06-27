import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
import BaseValidate from "./BaseValidate";
const settingSchema = z.object({
  website_name: z.string().min(1, "Tiêu đề không được để trống"),
  email: z.string().email("Email không hợp lệ").optional(),
  hotline: z.string().optional(),
  address: z.string().optional(),
  map: z.string().optional(),
  logo: z.string().optional()
});
type SettingType = z.infer<typeof settingSchema>;
class SettingValidate extends BaseValidate<SettingType> {
  protected schema = settingSchema;
}

export default SettingValidate;
