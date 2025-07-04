import logger from "../../configs/logger";
import actorModel, { IActor } from "../../models/schema/actorSchema";
import { IActorInput } from "../../interfaces/IActorInput";
import BaseService from "./BaseService";
import { existActor } from "../../helpers/existActor";
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
}
export default ActorService;
