import { showConfirm, showInfo } from "../shared/alert.js";
import BaseService from "../service/Base.js";
import MovieValidate from "../validations/MovieValidate.js";
import { handleImagePreview, handleVideoPreview } from "../shared/previewMediaFile.js";
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
  const previewImage = document.querySelector(".preview_image");
  const previewVideo = document.querySelector(".preview_video");
  const mode = createMovieForm.getAttribute("data-mode");
  if (createMovieForm) {
    createMovieForm.addEventListener("submit", async (e) => {
      const selectedActors = Array.from(actors.selectedOptions).map((option) => option.value);
      e.preventDefault();
      // const formData = new FormData(createMovieForm);
      // const data = Object.fromEntries(formData.entries());
      const formData = new FormData();
      const data = {
        title: title.value,
        description: description.value,
        genre: genre.value,
        poster: poster.files?.[0] ?? previewImage.src,
        trailer: trailer.files?.[0] ?? previewVideo.src,
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
      formData.append("poster", data.poster);
      formData.append("trailer", data.trailer);
      formData.append("releaseDate", releaseDate.value);
      formData.append("duration", data.duration);
      formData.append("age_permission", data.age_permission);
      try {
        if (mode === "Create Movie") {
          const response = await _baseService.create(formData, "admin/movie/create-movie");
          if (response.status === 201) {
            showInfo("Tạo phim thành công", "", "success");
          } else {
            showInfo("Tạo phim thất bại", response.error, "error");
          }
        } else {
          const isConfirmed = await showConfirm(
            "Cập nhật",
            "Bạn có chắc chắn muốn cập nhật phim này không?",
            "question"
          );
          if (!isConfirmed.isConfirmed) return;
          const movie_id = createMovieForm.getAttribute("movie_id");
          const response = await _baseService.update(formData, `admin/movie/update-movie/${movie_id}`);
          if (response.status === 200) {
            await showInfo("Cập nhật phim thành công", "", "success");
            location.reload();
          } else {
            showInfo("Tạo phim thất bại", response.error, "error");
          }
        }
      } catch {
        showInfo("Lỗi khi tạo phim", " Vui lòng thử lại!", "error");
      }
    });
  }
  /// xử lý preview img và video
  handleImagePreview(poster, previewImage);
  handleVideoPreview(trailer, previewVideo);
  ///end preview img và video
};
