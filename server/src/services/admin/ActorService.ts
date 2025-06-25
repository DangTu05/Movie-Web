import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
import actorModel, { IActor } from "../../models/schema/actorSchema";
import { IBaseService } from "../../interfaces/IBaseService";
import { IActorInput } from "../../interfaces/IActorInput";
import BaseService from "./BaseService";
class ActorService extends BaseService<IActor, IActorInput> {
  protected model = actorModel;
  public async getAllActor(): Promise<IActor[]> {
    const actors: IActor[] = await actorModel.find({ deleted: false });
    if (actors.length === 0) {
      logger.error("No actors found");
    }
    return actors;
  }
}
export default ActorService;
