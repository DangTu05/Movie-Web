import { showInfo } from "../shared/alert.js";
import constants from "../shared/constants.js";
class ArticleValidate {
  static validateCreateArticle(data) {
    if (!data.title || !data.content) {
      showInfo(constants.WARNING_INFO, constants.WARNING_INPUT, "warning");
      return false;
    }
    return true;
  }
}
export default ArticleValidate;
