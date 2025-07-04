import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";

class ActorValidate {
  static validateCreateActor(data) {
    if (!data.actor_name || !data.birthDate || !data.actor_image || !data.nationality || !data.gender) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default ActorValidate;
