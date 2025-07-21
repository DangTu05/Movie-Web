import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class RoomValidate {
  static validateCreateRoom(data) {
    if (!data.room_number || !data.chair_total) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    if (data.room_number <= 0) {
      showInfo("", "Số phòng phải lớn hơn 0", "warning");
      return false;
    }
    if (data.chair_total <= 0) {
      showInfo("", "Số ghế của phòng phải lớn hơn 0", "warning");
      return false;
    }
    return true;
  }
}
export default RoomValidate;
