import mongoose from "mongoose";
import movieModel, { IMovie } from "../../models/schema/movieSchema";
import { IMovieInput } from "../../interfaces/IMovieInput";
import { existActor } from "../../helpers/existActor";
import { existCategory } from "../../helpers/existCategory";
import BaseService from "./BaseService";
import { existMovie } from "../../helpers/existMovie";

class MovieService extends BaseService<IMovie, IMovieInput> {
  protected model = movieModel;

  protected async convertData(movieData: IMovieInput): Promise<IMovie> {
    const converted: Partial<IMovie> = {
      title: movieData.title,
      description: movieData.description,
      poster: movieData.poster,
      trailer: movieData.trailer,
      releaseDate: movieData.releaseDate,
      duration: movieData.duration,
      age_permission: movieData.age_permission
    };
    // ✅ Convert actors
    if (movieData.actors && movieData.actors.length > 0) {
      const actorObjectIds = await Promise.all(
        movieData.actors.map(async (actorId: string) => {
          await existActor(actorId);
          return new mongoose.Types.ObjectId(actorId);
        })
      );
      converted.actors = actorObjectIds;
    }

    // ✅ Convert genre
    if (movieData.genre) {
      await existCategory(movieData.genre);
      converted.genre = new mongoose.Types.ObjectId(movieData.genre);
    }

    return converted as IMovie;
  }
  // update
  /// Check xem id phim người dùng gửi lên có tồn tại hay ko
  protected async checkId(id: string): Promise<void> {
    return await existMovie(id);
  }
  // end update

  // Xét trạng thái phim
  public getMovieStatus(releaseDate: Date) {
    const now = new Date();
    if (now > new Date(releaseDate)) return "Đang chiếu";
    return "Sắp chiếu";
  }
  // end xét trạng thái phim

  // Tìm phim theo id
  public async findMovieById(id: string) {
    const movie = await movieModel.findOne({ _id: id, deleted: false }).lean();
    return movie;
  }

  // End tìm phim theo id
}

export default MovieService;
