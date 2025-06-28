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
  async render(req: Request, res: Response) {
    logger.info("Rendering create role view");
    res.render("admin/pages/create-role");
  }
}
export default RoleController;
