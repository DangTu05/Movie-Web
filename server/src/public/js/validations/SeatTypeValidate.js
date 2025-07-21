import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class SeatTypeValidate {
  static validateCreateSeatType(data) {
    if (!data.seat_type) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default SeatTypeValidate;
