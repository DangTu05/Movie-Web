import roleModel from "../models/schema/roleSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existRole = async (roleId: string) => {
  const exists = roleModel.exists({ _id: roleId, deleted: false });
  if (!exists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Role not found", true);
  }
};
export { existRole };
