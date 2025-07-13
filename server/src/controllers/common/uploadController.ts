import { IMulterRequest } from "../../interfaces/upload/IMulterRequest";
import { Response } from "express";
const uploadImageForTinymce = async (req: IMulterRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  console.log("req.file:", req.file);

  const imageUrl = req.file?.path;
  res.json({ location: imageUrl }); // ✅ không return
};
export { uploadImageForTinymce };
