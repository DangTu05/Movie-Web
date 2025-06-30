import roleModel from "../models/schema/roleSchema";
const existRole = (roleId: string) => {
  const role = roleModel.findById(roleId).select("_id").lean();
  return !!role;
};
export { existRole };
