import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
import BaseValidate from "./BaseValidate";
const movieSchema = z.object({
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
  status: z.enum(["Sắp chiếu", "Đang chiếu"]).refine((val) => ["Sắp chiếu", "Đang chiếu"].includes(val), {
    message: "Trạng thái không hợp lệ"
  })
});
type MovieType = z.infer<typeof movieSchema>;
class MovieValidate extends BaseValidate<MovieType> {
  protected schema = movieSchema;
  protected preprocess(data: any) {
    data.age_permission = parseInt(data.age_permission, 10);
    data.duration = parseInt(data.duration, 10);
    return data;
  }
}
export default MovieValidate;
