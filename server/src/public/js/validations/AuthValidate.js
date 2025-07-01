import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
import { hasWhitespace } from "./hasWhitespace.js";
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
class AuthValidate {
  static validateRegister(data) {
    if (!data.email || !data.username || !data.password) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    if (!isValidEmail(data.email)) {
      showInfo("Email không hợp lệ", " Vui lòng nhập email hợp lệ!", "warning");
      return false;
    }
    if (data.username.length < 3) {
      showInfo("Tên đăng nhập phải có ít nhất 3 ký tự", " Vui lòng nhập tên đăng nhập có ít nhất 3 ký tự!", "warning");
      return false;
    }
    if (data.password.length < 6) {
      showInfo("Mật khẩu phải có ít nhất 6 ký tự", " Vui lòng nhập mật khẩu có ít nhất 6 ký tự!", "warning");
      return false;
    }
    if (!hasWhitespace(data.username)) return false;
  }
  static validateLogin(data) {
    if (!data.username || !data.password) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default AuthValidate;
