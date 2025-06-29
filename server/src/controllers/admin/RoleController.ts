import { Request, Response, NextFunction } from "express";
import RoleService from "../../services/admin/RoleService";
import BaseController from "./BaseController";
import { IRoleInput } from "../../interfaces/IRoleInput";
import { IRole } from "../../models/schema/roleSchema";
import logger from "../../configs/logger";
import RoleValidate from "../../validations/RoleValidate";
const _roleValidate = new RoleValidate();
class RoleController extends BaseController<RoleService, IRoleInput, IRole> {
  constructor(private readonly roleService: RoleService) {
    super();
  }
  protected service: RoleService = this.roleService;
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _roleValidate.validate(req);
  }
  /// Show giao diện
  async render(req: Request, res: Response) {
    const viewName = req.params.view || "create-role"; // hoặc lấy từ query/view logic
    let data: any = {};
    if (viewName === "permission") {
      const roles = await this.roleService.getRole();
      const count = await this.roleService.getCountRole();
      data.roles = roles;
      data.count = count;
    }
    logger.info(`Rendering view: ${viewName}`);
    res.render(`admin/pages/${viewName}`, { data: data });
  }
  /// End show giao diện
}
export default RoleController;
