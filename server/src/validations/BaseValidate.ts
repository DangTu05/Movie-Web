import { z, ZodSchema } from "zod";
import { formatZodErrors } from "../utils/formatZodError";
import { Request } from "express";
import logger from "../configs/logger";
abstract class BaseValidate<T> {
  protected abstract schema: ZodSchema<T>;
  // Optional: xử lý dữ liệu trước khi validate (ví dụ parseInt)
  protected preprocess?(data: any): any;
  public validate(req: Request): { success: boolean; errors?: any } {
    let data = req.body;

    if (this.preprocess) {
      data = this.preprocess(data);
      req.body = data; // gán lại body sau khi xử lý
    }

    const result = this.schema.safeParse(data);
    if (!result.success) {
      const errors = formatZodErrors(result.error);
      logger.error("Validation errors:", errors);
      return { success: false, errors };
    }

    return { success: true };
  }
}
export default BaseValidate;
