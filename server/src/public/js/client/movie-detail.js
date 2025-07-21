//Viết sự kiện cho nút trailer
document.addEventListener("DOMContentLoaded", function () {
  const buttonTrailer = document.getElementById("button-trailer");
  const playTrailer = document.getElementById("play-button");
  const movieTrailer2 = document.getElementById("inner-iframe");
  const closeTrailer = document.getElementById("close");
  const overlay = document.getElementById("overlay");

  // Hàm mở trailer
  playTrailer.addEventListener("click", function () {
    overlay.style.display = "block";
    movieTrailer2.style.display = "block";
    closeTrailer.style.display = "block";
  });

  //Hàm mở trailer khi nhấn vào nút trailer
  buttonTrailer.addEventListener("click", function () {
    overlay.style.display = "block";
    movieTrailer2.style.display = "block";
    closeTrailer.style.display = "block";
  });

  // Hàm đóng trailer
  closeTrailer.addEventListener("click", function () {
    overlay.style.display = "none";
    movieTrailer2.style.display = "none";
    closeTrailer.style.display = "none";
    movieTrailer2.querySelector("iframe").src = movieTrailer2.querySelector("iframe").src;
  });
});
