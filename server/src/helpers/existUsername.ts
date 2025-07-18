import accountModel from "../models/schema/accountSchema";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
const existUsername = async (username: string): Promise<void> => {
  const account = await accountModel.exists({ deleted: false, username: username });
  if (account) throw new ApiError(StatusCodes.CONFLICT, "Username đã tồn tại");
};
export { existUsername };
