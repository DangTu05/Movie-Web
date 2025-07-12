import movieModel, { IMovie } from "../../models/schema/movieSchema";
import Constants from "../../utils/Constant";
// Danh sách phim sắp chiếu
const getComingSoonMovies = async (): Promise<IMovie[]> => {
  return await movieModel
    .find({ deleted: false, status: "Sắp chiếu" })
    .populate({
      path: "genre",
      select: "category_name"
    })
    .limit(10)
    .select(Constants.COMMON_SELECT_FIELDS)
    .lean();
};
// Danh sách phim đang chiếu
const getNowPlayingMovies = async (): Promise<IMovie[]> => {
  return await movieModel
    .find({ deleted: false, status: "Đang chiếu" })
    .populate({
      path: "genre",
      select: "category_name"
    })
    .limit(10)
    .select(Constants.COMMON_SELECT_FIELDS)
    .lean();
};

export { getComingSoonMovies, getNowPlayingMovies };
