import { Role } from "./../../../../CodeClone/nodejs-boilerplate/src/models/User";
import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
import BaseValidate from "./BaseValidate";
const roleSchema = z.object({
  role_name: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Tiêu đề không được để trống")
});
type RoleType = z.infer<typeof roleSchema>;
class RoleValidate extends BaseValidate<RoleType> {
  protected schema = roleSchema;
}

export default RoleValidate;
