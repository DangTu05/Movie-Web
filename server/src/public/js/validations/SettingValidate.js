import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class SettingValidate {
  static validateCreateSetting(data) {
    if (!data.website_name) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default SettingValidate;
