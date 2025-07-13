import { Request } from "express";
interface IMulterRequest extends Request {
  file?: Express.Multer.File;
}
export { IMulterRequest };
