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
    const data: any = {};
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

  /// cập nhật permission
  async updatePermission(req: Request, res: Response, next: NextFunction) {
    const permissions = req.body;
    await this.roleService.updatePermission(permissions);
    sendResponse(res, StatusCodes.OK, null, "Cập nhật thành công", "");
  }
  /// end cập nhật permission
}
export default RoleController;
