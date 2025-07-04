import actorModel from "../models/schema/actorSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existActor = async (actorId: string): Promise<void> => {
  const exists = await actorModel.exists({ _id: actorId, deleted: false });
  if (!exists) throw new ApiError(StatusCodes.NOT_FOUND, "Actor không tồn tại");
};
export { existActor };
