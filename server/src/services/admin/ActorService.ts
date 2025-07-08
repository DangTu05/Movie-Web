import logger from "../../configs/logger";
import actorModel, { IActor } from "../../models/schema/actorSchema";
import { IActorInput } from "../../interfaces/IActorInput";
import BaseService from "./BaseService";
import { existActor } from "../../helpers/existActor";
import mongoose from "mongoose";
import Constants from "../../utils/Constant";

class ActorService extends BaseService<IActor, IActorInput> {
  protected model = actorModel;
  public async getAllActor() {
    const actors: IActor[] = await actorModel.find({ deleted: false }).lean();
    if (actors.length === 0) {
      logger.error("No actors found");
    }
    return actors;
  }
  protected async checkId(id: string): Promise<void> {
    return await existActor(id);
  }
  public async findActorById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id actor người dùng gửi lên không hợp lệ!");
      return;
    }
    return await this.model.findOne({ _id: id, deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
  }
}
export default ActorService;
