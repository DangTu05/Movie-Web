import roleModel from "../models/schema/roleSchema";
const existRole = (roleId: string) => {
  const roleId = roleModel.findById(roleId).select("_id").lean();
  return !!roleId;
};
export { existRole };
