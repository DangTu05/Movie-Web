import logger from "../configs/logger";
import actorModel, { IActor } from "../models/schema/actorSchema";
import { IActorInput } from "../interfaces/IActorInput";
import BaseService from "./BaseService";
import { existActor } from "../helpers/existActor";
import mongoose from "mongoose";
import Constants from "../utils/Constant";
import { IPagination } from "../interfaces/IPagination";
import { formatDate } from "../utils/formatDate";

class ActorService extends BaseService<IActor, IActorInput> {
  protected model = actorModel;
  public async getAllActor(pagination?: IPagination) {
    // Nếu không truyền pagination thì lấy toàn bộ
    if (!pagination) {
      const actors: IActor[] = await actorModel.find({ deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
      if (actors.length === 0) {
        logger.error("No actors found");
      }
      return actors;
    }

    // Nếu có truyền pagination
    const [actors, count] = await Promise.all([
      actorModel
        .find({ deleted: false })
        .select(Constants.COMMON_SELECT_FIELDS)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      actorModel.countDocuments({ deleted: false })
    ]);
    pagination.count = count;
    pagination.totalPage = Math.ceil(count / pagination.limit);
    // format date về kiểu yyyy/mm/dd
    const formattedActors = actors.map((actor) => ({
      ...actor,
      birthDate: formatDate(actor.birthDate)
    }));
    return {
      pagination: {
        ...pagination
      },
      actors: formattedActors
    };
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
