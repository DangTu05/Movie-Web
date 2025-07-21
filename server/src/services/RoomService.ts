import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import { IRoomInput } from "../interfaces/IRoomInput";
import roomModel, { IRoom } from "../models/schema/roomSchema";
import BaseService from "./BaseService";
class RoomService extends BaseService<IRoom, IRoomInput> {
  protected model = roomModel;
  protected async checkId(id: string): Promise<void> {}
  protected async checkExist(data: IRoomInput): Promise<void> {
    const { room_number } = data;
    const existingRoom = await this.model.findOne({ room_number });
    if (existingRoom) {
      throw new ApiError(400, `Phòng với số ${room_number} đã tồn tại!`);
    }
  }
}
export default RoomService;
