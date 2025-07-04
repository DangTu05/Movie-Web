import BaseService from "./BaseService";
import roleModel, { IRole } from "../../models/schema/roleSchema";
import { IRoleInput } from "../../interfaces/IRoleInput";
import { existRole } from "../../helpers/existRole";
interface PermissionUpdate {
  _id: string;
  permissions: string[]; // hoặc: mongoose.Types.ObjectId[] nếu là ref
}
class RoleService extends BaseService<IRole, IRoleInput> {
  protected model = roleModel;
  public async getRole() {
    return await this.model.find({ deleted: false }).select("-deleted -createdBy -updatedBy -__v").lean();
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
}
export default RoleService;
