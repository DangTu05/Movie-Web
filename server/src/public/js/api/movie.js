import { baseApiUrl } from "../shared/config.js";
import BaseService from "../service/Base.js";
const _baseService = new BaseService();

class MovieApi {
  async getMovies() {
    return await _baseService.get(`${baseApiUrl}/movie/movies`);
  }
}
export default MovieApi;
