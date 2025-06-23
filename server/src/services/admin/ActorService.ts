import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
import actorModel, { IActor } from "../../models/schema/actorSchema";
class ActorService {
  public async createActor(actorData: any): Promise<void> {
    const newActor = new actorModel(actorData);
    await newActor.save();
    logger.info("New actor created successfully", actorData);
  }
  public async getAllActor(): Promise<IActor[]> {
    const actors: IActor[] = await actorModel.find({ deleted: false });
    if (actors.length === 0) {
      logger.error("No actors found");
    }
    return actors;
  }
}
export default ActorService;
