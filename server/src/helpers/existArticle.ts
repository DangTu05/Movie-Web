import articleModel from "../models/schema/articleSchema";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
const existArticle = async (articleId: string) => {
  const exists = await articleModel.exists({ _id: articleId, deleted: false });
  if (!exists) throw new ApiError(StatusCodes.NOT_FOUND, "Article không tồn tại", true);
};
export { existArticle };
