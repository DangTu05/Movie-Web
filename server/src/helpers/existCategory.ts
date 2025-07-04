import categoryModel from "../models/schema/categorySchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existCategory = async (categoryId: string): Promise<void> => {
  const exists = await categoryModel.exists({ _id: categoryId, deleted: false });
  if (!exists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }
};

export { existCategory };
