import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
import movieModel from "../../models/schema/movieSchema";
export class MovieService {
  public async createMovie(movieData: any): Promise<void> {
    const newMovie = new movieModel(movieData);
    await newMovie.save();
    logger.info("New movie created successfully", movieData);
  }
}
