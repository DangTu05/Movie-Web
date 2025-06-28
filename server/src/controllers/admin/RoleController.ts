import { Request, Response, NextFunction } from "express";
import logger from "../../configs/logger";
class RoleController {
  async render(req: Request, res: Response, next: NextFunction) {
    logger.info("Rendering create role view");
    res.render("admin/pages/create-role");
  }
}
export default RoleController;
