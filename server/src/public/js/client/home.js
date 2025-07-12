import MovieApi from "../api/movie.js";
const playTrailer = document.querySelectorAll(".inner-icon");
const movieTrailer = document.getElementById("inner-iframe");
const closeTrailer = document.getElementById("close");
const overlay = document.getElementById("overlay");
const selectMovie = document.getElementById("select-movie");
const selectDate = document.getElementById("select-date");

const _movieApi = new MovieApi();
// Hàm lấy ra phim
const getMovies = async () => {
  const response = await _movieApi.getMovies();
  return response.data;
};
// Hàm mở trailer
const showTrailer = (src) => {
  overlay.style.display = "block";
  movieTrailer.style.display = "block";
  closeTrailer.style.display = "block";
  movieTrailer.innerHTML = `
    <iframe width="860" height="515" src="${src}" frameborder="0" allowfullscreen></iframe>
  `;
};

// Hàm đóng trailer
const hideTrailer = () => {
  overlay.style.display = "none";
  movieTrailer.style.display = "none";
  closeTrailer.style.display = "none";
  movieTrailer.innerHTML = "";
};

// Gắn sự kiện một lần duy nhất
const renderTrailer = () => {
  playTrailer.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const dataTrailer = item.getAttribute("data-trailer");
      if (dataTrailer) {
        showTrailer(dataTrailer);
      }
    });
  });

  closeTrailer.addEventListener("click", function (event) {
    event.stopPropagation(); // Nếu cần
    hideTrailer();
  });
};
// render ngày chiếu theo phim tương ứng
const renderDateSelectByMovieNameAndCinemaName = async (movieId) => {
  const movies = await getMovies();
  const filteredMovies = movies.filter((movie) => movie._id === movieId);
  filteredMovies.forEach((movie) => {
    let option = document.createElement("option");
    option.value = movie.id;
    option.text = movie.releaseDate.toString();
    selectDate.appendChild(option);
  });
};
// Gán sự kiện người dùng select phim
const handleSelectMovie = async () => {
  selectMovie.addEventListener("change", async (event) => {
    const movieId = event.target.value;
    selectDate.innerHTML = "";
    await renderDateSelectByMovieNameAndCinemaName(movieId);
  });
};
const start = () => {
  renderTrailer();
  // handleSelectMovie();
};
window.onload = start;
