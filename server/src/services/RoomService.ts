import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import { IRoomInput } from "../interfaces/IRoomInput";
import roomModel, { IRoom } from "../models/schema/roomSchema";
import BaseService from "./BaseService";
import { existRoom } from "../helpers/existRoom";
import { StatusCodes } from "http-status-codes";
import Constants from "../utils/Constant";
import logger from "../configs/logger";
class RoomService extends BaseService<IRoom, IRoomInput> {
  protected model = roomModel;
  protected async checkId(id: string): Promise<void> {
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "ID không hợp lệ");
    }
    await existRoom(id);
  }
  protected async checkExist(data: IRoomInput): Promise<void> {
    const { room_number } = data;
    const existingRoom = await this.model.findOne({ room_number });
    if (existingRoom) {
      throw new ApiError(400, `Phòng với số ${room_number} đã tồn tại!`);
    }
  }
  public async findRoomById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id room người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model.findOne({ _id: id, deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
  }
}
export default RoomService;
