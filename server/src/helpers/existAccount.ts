import accountModel from "../models/schema/accountSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existAccount = async (id: string) => {
  const exists = accountModel.exists({ _id: id, deleted: false });
  if (!exists) throw new ApiError(StatusCodes.NOT_FOUND, "Account không tồn tại", true);
};
export { existAccount };
