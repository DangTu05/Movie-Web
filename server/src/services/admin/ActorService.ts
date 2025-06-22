import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
import actorModel from "../../models/schema/actorSchema";
class ActorService {
  public async createActor(actorData: any): Promise<void> {
    const newActor = new actorModel(actorData);
    await newActor.save();
    logger.info("New actor created successfully", actorData);
  }
}
export default ActorService;
