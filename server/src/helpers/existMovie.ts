import movieModel from "../models/schema/movieSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existMovie = async (movieId: string): Promise<void> => {
  const exists = await movieModel.exists({ _id: movieId, deleted: false });
  if (!exists) throw new ApiError(StatusCodes.NOT_FOUND, "Phim không tồn tại");
};
export { existMovie };
