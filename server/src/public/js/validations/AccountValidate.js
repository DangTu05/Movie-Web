import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
import { hasWhitespace } from "./hasWhitespace.js";
class AccountValidate {
  static validateCreateAccount(data) {
    if (!data.username || !data.email || !data.password || !data.role_id) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    if (!hasWhitespace(data.username)) return false;
    return true;
  }
}
export default AccountValidate;
