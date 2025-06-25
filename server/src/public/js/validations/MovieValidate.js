import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class MovieValidate {
  static validateCreateMovie(data) {
    if (
      !data.title ||
      !data.genre ||
      !data.poster ||
      !data.trailer ||
      !data.releaseDate ||
      !data.duration ||
      !data.age_permission
    ) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    const maxSizeMB = 20;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (data.trailer.size > maxSizeBytes) {
      showInfo("", "Video vượt quá 20MB", "warning");
      return false;
    }
    return true;
  }
}
export default MovieValidate;
