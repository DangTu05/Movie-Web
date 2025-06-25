import { showInfo, showConfirm } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import MovieValidate from "../validations/MovieValidate.js";
const _baseService = new BaseService();

window.onload = () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const genre = document.getElementById("genre");
  const actors = document.getElementById("actor");
  const poster = document.getElementById("poster");
  const trailer = document.getElementById("trailer");
  const releaseDate = document.getElementById("releaseDate");
  const duration = document.getElementById("duration");
  const age_permission = document.getElementById("age_permission");
  const createMovieForm = document.querySelector(".create-movie-form");
  const createMovieButton = document.querySelector(".create-movie-btn");
  if (createMovieForm) {
    createMovieForm.addEventListener("submit", async (e) => {
      const selectedActors = Array.from(actors.selectedOptions).map((option) => option.value);
      e.preventDefault();
      const formData = new FormData();
      const data = {
        title: title.value,
        description: description.value,
        genre: genre.value,
        poster: poster.files[0],
        trailer: trailer.files[0],
        releaseDate: releaseDate.value,
        duration: duration.value ? parseInt(duration.value, 10) : 0,
        age_permission: age_permission.value ? parseInt(age_permission.value, 10) : 0,
        actors: selectedActors ? selectedActors : []
      };
      if (!MovieValidate.validateCreateMovie(data)) {
        return;
      }
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("genre", genre.value);
      selectedActors.forEach((actor) => {
        formData.append("actor", actor); // giống cách gửi nhiều checkbox
      });
      formData.append("poster", poster.files[0]);
      formData.append("trailer", trailer.files[0]);
      formData.append("releaseDate", releaseDate.value);
      formData.append("duration", data.duration);
      formData.append("age_permission", data.age_permission);
      try {
        const response = await _baseService.create(formData, "admin/movie/create-movie");
        if (response.status === 201) {
          showInfo("Tạo phim thành công", "", "success");
        } else {
          showInfo("Tạo phim thất bại", response.error, "error");
        }
      } catch (error) {
        showInfo("Lỗi khi tạo phim", " Vui lòng thử lại!", "error");
      }
    });
  }
};
