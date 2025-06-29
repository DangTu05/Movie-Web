import BaseService from "./BaseService";
import roleModel, { IRole } from "../../models/schema/roleSchema";
import { IRoleInput } from "../../interfaces/IRoleInput";
class RoleService extends BaseService<IRole, IRoleInput> {
  protected model = roleModel;
  public async getRole() {
    return await this.model.find({ deleted: false });
  }
  public async getCountRole() {
    return await this.model.countDocuments({ deleted: false });
  }
}
export default RoleService;
