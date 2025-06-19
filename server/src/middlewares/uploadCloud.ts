import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary";

// Lưu ảnh
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "poster") {
      return {
        folder: "movie-posters",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: file.originalname.split(".")[0]
      };
    }
    if (file.fieldname === "trailer") {
      return {
        folder: "movie-trailers",
        resource_type: "video",
        allowed_formats: ["mp4", "mov"],
        public_id: file.originalname.split(".")[0]
      };
    }

    // Nếu field không hợp lệ
    throw new Error("Unexpected field: " + file.fieldname);
  }
});

// Dùng 1 multer duy nhất xử lý cả 2 field
const uploadMedia = multer({
  storage: imageStorage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
}).fields([
  { name: "poster", maxCount: 1 },
  { name: "trailer", maxCount: 1 }
]);

export default uploadMedia;
