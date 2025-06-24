import { z } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
import BaseValidate from "./BaseValidate";
const categorySchema = z.object({
  category_name: z.string().min(1, "Vui lòng nhập tên thể loại!")
});
type CategoryType = z.infer<typeof categorySchema>;
class CategoryValidate extends BaseValidate<CategoryType> {
  protected schema = categorySchema;
}
export default CategoryValidate;
