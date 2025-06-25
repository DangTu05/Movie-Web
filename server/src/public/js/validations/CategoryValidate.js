import { showInfo, showConfirm } from "../shared/alert.js";
import constants from "../shared/constants.js";

class CategoryValidate {
  static validateCreateCategory(data) {
    if (!data.category_name) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default CategoryValidate;
