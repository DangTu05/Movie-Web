import { z } from "zod";
import BaseValidate from "./BaseValidate";
const articleSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  content: z.string().min(1, "Nội dung không được để trống"),
  image: z.string().min(1, "Ảnh không được để trống")
});
type ArticleType = z.infer<typeof articleSchema>;
class ArticleValidate extends BaseValidate<ArticleType> {
  protected schema = articleSchema;
}
export default ArticleValidate;
