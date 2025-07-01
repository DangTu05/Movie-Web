import { showInfo } from "../shared/alert.js";
const hasWhitespace = (str) => {
  if (/\s/.test(str)) {
    showInfo("", "Tên đăng nhập không được có khoảng trắng!", "warning");
    return false;
  }
  return true;
};

export { hasWhitespace };
