import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
import movieModel from "../../models/schema/movieSchema";
import existActor from "../../helpers/existActor";
import { ObjectId } from "mongodb";
class MovieService {
  public async createMovie(movieData: any): Promise<void> {
    if (movieData.actors.length !== 0) {
      movieData.actors = await Promise.all(
        movieData.actors.map(async (actorId: string) => {
          const exists = await existActor(actorId);
          if (!exists) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Actor with ID ${actorId} does not exist`);
          }
          return new ObjectId(actorId);
        })
      );
    }
    const newMovie = new movieModel(movieData);
    await newMovie.save();
    logger.info("New movie created successfully", movieData);
  }
}
export default MovieService;
