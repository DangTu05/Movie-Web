import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Mã hóa mật khẩu thuần thành mật khẩu đã băm.
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * So sánh mật khẩu người dùng nhập với mật khẩu đã lưu trong DB.
 */
export const comparePassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
