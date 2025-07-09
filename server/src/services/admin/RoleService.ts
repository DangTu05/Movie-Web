import BaseService from "./BaseService";
import roleModel, { IRole } from "../../models/schema/roleSchema";
import { IRoleInput } from "../../interfaces/IRoleInput";
import { existRole } from "../../helpers/existRole";
import Constants from "../../utils/Constant";
import mongoose from "mongoose";
import logger from "../../configs/logger";
import { IPagination } from "../../interfaces/IPagination";
interface PermissionUpdate {
  _id: string;
  permissions: string[]; // hoặc: mongoose.Types.ObjectId[] nếu là ref
}
class RoleService extends BaseService<IRole, IRoleInput> {
  protected model = roleModel;
  public async getAllRole(pagination?: IPagination) {
    if (!pagination) {
      const roles: IRole[] = await this.model.find({ deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
      if (roles.length === 0) {
        logger.info("No roles found");
      }
      return roles;
    } else {
      const [roles, count] = await Promise.all([
        this.model
          .find({ deleted: false })
          .select(Constants.COMMON_SELECT_FIELDS)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .lean(),
        this.model.countDocuments({ deleted: false })
      ]);
      pagination.count = count;
      pagination.totalPage = Math.ceil(count / pagination.limit);
      return {
        pagination: {
          ...pagination
        },
        roles
      };
    }
  }
  public async getCountRole() {
    return await this.model.countDocuments({ deleted: false }).lean();
  }
  public async updatePermission(permissions: PermissionUpdate[]) {
    for (const item of permissions) {
      await roleModel.updateOne(
        { _id: item._id },
        {
          $set: { permissions: item.permissions },
          $push: {
            updatedBy: {
              // id: new mongoose.Types.ObjectId(item._id),
              updatedAt: new Date()
            }
          }
        }
      );
    }
  }

  protected async checkId(id: string): Promise<void> {
    return await existRole(id);
  }
  public async findRoleById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id role người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model.findOne({ _id: id, deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
  }
}
export default RoleService;
