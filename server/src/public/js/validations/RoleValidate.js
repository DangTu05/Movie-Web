import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class RoleValidate {
  static validateCreateRole(data) {
    if (!data.role_name || !data.description) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default RoleValidate;
