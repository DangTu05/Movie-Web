import { baseApiUrl, statusCode } from "../shared/config.js";
import AppError from "../shared/Error.js";
class HttpClient {
  async request(endpoint, method, header, data = null) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const requestOptions = {
        method: method,
        headers: {
          ...header,
          Accept: "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
        credentials: "include" // gửi cookie nếu cần (ví dụ: đăng nhập)
      };
      const isFormData = data instanceof FormData;
      if (isFormData) {
        requestOptions.body = data; // FormData không cần stringify
        delete requestOptions.headers["Content-Type"]; // Trình duyệt sẽ tự động thiết lập Content-Type cho FormData
      } else if (data) {
        requestOptions.body = JSON.stringify(data); // Chuyển đổi dữ liệu thành chuỗi JSON
        requestOptions.headers["Content-Type"] = "application/json"; // Thiết lập Content-Type nếu không phải FormData
      }
      const fetchData = await fetch(`${baseApiUrl}/${endpoint}`, requestOptions);
      //Trường hợp server redirect (ví dụ: chưa đăng nhập thì chuyển về login page), frontend cũng chuyển theo.
      if (fetchData.redirected && fetchData.url) {
        window.location.href = fetchData.url;
      }
      const responseData = await fetchData.json();
      responseData.status = fetchData.status;
      return responseData;
    } catch (error) {
      throw new AppError(`Error: ${error.message}`, statusCode.internalServerError);
    }
  }
}

export default HttpClient;
