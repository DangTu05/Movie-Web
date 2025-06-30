import { z } from "zod";
import BaseValidate from "./BaseValidate";
const accountSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên đăng nhập!"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu!"),
  email: z.string().email().min(1, "Vui lòng nhập email!"),
  role_id: z.string().min(1, "Vui lòng chọn vai trò!")
});
type AccountType = z.infer<typeof accountSchema>;
class AccountValidate extends BaseValidate<AccountType> {
  protected schema = accountSchema;
}
export default AccountValidate;
