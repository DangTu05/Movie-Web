import { showInfo } from "./alert.js";
// Preview ảnh người dùng chọn
const handleImagePreview = (fileInput, previewImg) => {
  fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (file && file.type.startsWith("image/")) {
      previewImg.src = URL.createObjectURL(file);
    }
  });
};
const handleVideoPreview = (fileInput, previewVideo, maxSize = 20) => {
  fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (file && file.type.startsWith("video/")) {
      if (file.size > maxSize * 1024 * 1024) {
        showInfo("Video vượt quá 20MB", "", "warning");
      } else {
        previewVideo.src = URL.createObjectURL(file);
        previewVideo.controls = true;
        previewVideo.load();
      }
    }
  });
};
export { handleImagePreview, handleVideoPreview };
