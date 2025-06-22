import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
class ValidateActor {
  public static actorSchema = z.object({
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateCreateActor(reqbody: Request): { success: boolean; errors?: any } {
    const result = ValidateActor.actorSchema.safeParse(reqbody.body);
    if (!result.success) {
      // Format lỗi Zod về dạng dễ xử lý
      const errors = formatZodErrors(result.error);
      logger.error("Validation errors:", errors);
      return { success: false, errors };
    }
    return { success: true };
  }
}
export default ValidateActor;
