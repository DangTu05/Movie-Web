import axios from "axios";
import logger from "../../configs/logger";
import ApiError from "../../utils/ApiError";
const getProvinces = async (): Promise<any> => {
  try {
    const res = await axios.get("https://provinces.open-api.vn/api/p/");
    return res.data;
  } catch (error) {
    logger.error("Gọi API tỉnh thành thất bại:", error);
    throw new ApiError(500, "Gọi API tỉnh thành thất bại");
  }
};
export default getProvinces;
