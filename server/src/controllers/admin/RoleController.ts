/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import RoleService from "../../services/admin/RoleService";
import BaseController from "./BaseController";
import { IRoleInput } from "../../interfaces/IRoleInput";
import { IRole } from "../../models/schema/roleSchema";
import logger from "../../configs/logger";
import errorHandler from "../../utils/handler/handleAsync";
import RoleValidate from "../../validations/RoleValidate";
import sendResponse from "../../utils/handler/response";
import { StatusCodes } from "http-status-codes";
const _roleValidate = new RoleValidate();
class RoleController extends BaseController<RoleService, IRoleInput, IRole> {
  constructor(private readonly roleService: RoleService) {
    super();
    this.updatePermission = errorHandler.handleAsyncErrors(this.updatePermission.bind(this));
  }
  protected service: RoleService = this.roleService;
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _roleValidate.validate(req);
  }
  /// Show giao diện
  async render(req: Request, res: Response) {
    const viewName = req.params.view || "create-role"; // hoặc lấy từ query/view logic
    const viewNames = ["create-role", "update-role"];
    const data: any = {};
    if (viewNames.includes(viewName)) {
      data.title = viewName === "create-role" ? "Create Role" : "Update Role";
    }
    if (viewName === "update-role") {
      if (!req.params.id) {
        return res.redirect("/admin/roles");
      }
      data.role = await this.roleService.findRoleById(req.params.id);
      if (!data.role) {
        return res.redirect("/admin/roles");
      }
    }
    if (viewName === "permission") {
      const roles = await this.roleService.getRole();
      const count = await this.roleService.getCountRole();
      data.roles = roles;
      data.count = count;
    }
    const actualView = viewNames.includes(viewName) ? "create-role" : viewName;
    logger.info(`Rendering view: ${actualView}`);
    res.render(`admin/pages/${actualView}`, { data: data });
  }
  /// End show giao diện

  /// cập nhật permission
  async updatePermission(req: Request, res: Response, next: NextFunction) {
    const permissions = req.body;
    await this.roleService.updatePermission(permissions);
    sendResponse(res, StatusCodes.OK, null, "Cập nhật thành công", "");
  }
  /// end cập nhật permission
}
export default RoleController;
