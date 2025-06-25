import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
import BaseValidate from "./BaseValidate";
const actorSchema = z.object({
  actor_name: z.string(),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Ngày sinh không hợp lệ"
  }),
  biography: z.string().optional(),
  actor_image: z.string().url("URL hình ảnh không hợp lệ").optional(),
  gender: z.enum(["male", "female", "other"], {
    errorMap: (issue, ctx) => {
      return { message: "Giới tính không hợp lệ" };
    }
  }),
  nationality: z.string().min(1, "Vui lòng nhập quốc tịch!")
});
type ActorType = z.infer<typeof actorSchema>;
class ActorValidate extends BaseValidate<ActorType> {
  protected schema = actorSchema;
}
export default ActorValidate;
