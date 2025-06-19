import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
class ValidateMovie {
  public static movieSchema = z.object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    description: z.string().optional(),
    genre: z.string().min(1, "Thể loại không được để trống"),
    poster: z.string().min(1, "Poster không được để trống"),
    trailer: z.string().min(1, "Trailer không được để trống"),
    releaseDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Ngày phát hành không hợp lệ"
    }),
    duration: z.number().min(1, "Thời lượng phải lớn hơn 0"),
    age_permission: z.number().min(0, "Giới hạn tuổi không được âm"),
    actors: z.array(z.string()).optional(),
    status: z.enum(["Sắp chiếu", "Đang chiếu"]).default("Sắp chiếu")
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateCreateMovie(reqbody: Request): { success: boolean; errors?: any } {
    reqbody.body.age_permission = parseInt(reqbody.body.age_permission, 10);
    reqbody.body.duration = parseInt(reqbody.body.duration, 10);
    const result = ValidateMovie.movieSchema.safeParse(reqbody.body);
    if (!result.success) {
      // Format lỗi Zod về dạng dễ xử lý
      const errors = formatZodErrors(result.error);
      logger.error("Validation errors:", errors);
      return { success: false, errors };
    }
    return { success: true };
  }
}
export default ValidateMovie;
