import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import movieModel, { IMovie } from "../../models/schema/movieSchema";
import { IMovieInput } from "../../interfaces/IMovieInput";
import existActor from "../../helpers/existActor";
import existCategory from "../../helpers/existCategory";
import BaseService from "./BaseService";


class MovieService extends BaseService<IMovie, IMovieInput> {
  protected model = movieModel;

  protected async checkExists(movieData: IMovieInput): Promise<IMovie> {
    const status = ["Sắp chiếu", "Đang chiếu", "Kết thúc"].includes(movieData.status)
      ? (movieData.status as "Sắp chiếu" | "Đang chiếu" | "Kết thúc")
      : "Sắp chiếu";

    const converted: Partial<IMovie> = {
      title: movieData.title,
      description: movieData.description,
      poster: movieData.poster,
      trailer: movieData.trailer,
      releaseDate: movieData.releaseDate,
      duration: movieData.duration,
      age_permission: movieData.age_permission,
      status: status
    };
    // ✅ Convert actors
    if (movieData.actors && movieData.actors.length > 0) {
      const actorObjectIds = await Promise.all(
        movieData.actors.map(async (actorId: string) => {
          const exists = await existActor(actorId);
          if (!exists) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Actor with ID ${actorId} does not exist`);
          }
          return new mongoose.Types.ObjectId(actorId);
        })
      );
      converted.actors = actorObjectIds;
    }

    // ✅ Convert genre
    if (movieData.genre) {
      const exists = await existCategory(movieData.genre);
      if (!exists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Category with ID ${movieData.genre} does not exist`);
      }
      converted.genre = new mongoose.Types.ObjectId(movieData.genre);
    }

    return converted as IMovie;
  }
}

export default MovieService;
