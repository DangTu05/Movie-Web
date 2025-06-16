import { ZodError } from "zod";

/**
 * Chuyển lỗi Zod thành dạng mảng phẳng: [{ field, message }]
 */
export const formatZodErrors = (error: ZodError) => {
  return error.errors.map((err) => ({
    field: err.path.join("."), // ex: 'email' hoặc 'profile.name'
    message: err.message
  }));
};
