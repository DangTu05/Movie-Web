import { showInfo, showConfirm } from "../shared/alert.js";
import { isValidEmail } from "../shared/validate.js";
class ValidateAuth {
  static validateRegister(data) {
    if (!data.email.value || !data.username.value || !data.password.value) {
      showInfo("Thiếu thông tin", " Vui lòng nhập đủ thông tin!", "warning");
      return false;
    }
    if (!isValidEmail(data.email.value)) {
      showInfo("Email không hợp lệ", " Vui lòng nhập email hợp lệ!", "warning");
      return false;
    }
    if (data.username.value.length < 3) {
      showInfo("Tên đăng nhập phải có ít nhất 3 ký tự", " Vui lòng nhập tên đăng nhập có ít nhất 3 ký tự!", "warning");
      return false;
    }
    if (data.password.value.length < 6) {
      showInfo("Mật khẩu phải có ít nhất 6 ký tự", " Vui lòng nhập mật khẩu có ít nhất 6 ký tự!", "warning");
      return false;
    }
    return true;
  }
}
export default ValidateAuth;
