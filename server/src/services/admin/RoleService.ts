import BaseService from "./BaseService";
import roleModel, { IRole } from "../../models/schema/roleSchema";
import { IRoleInput } from "../../interfaces/IRoleInput";
class RoleService extends BaseService<IRole, IRoleInput> {
  protected model = roleModel;
}
export default RoleService;
