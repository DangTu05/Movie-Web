import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import roomModel from "../models/schema/roomSchema";
const existRoom = async (roomId: string) => {
  const exists = await roomModel.exists({ _id: roomId, deleted: false });
  if (!exists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Room not found", true);
  }
};
export { existRoom };
