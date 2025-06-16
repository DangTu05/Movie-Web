import { baseApiUrl, statusCode } from "../shared/config.js";
import AppError from "../shared/Error.js";
class HttpClient {
  async request(endpoint, method, header, data = null) {
    try {
      const requestOptions = {
        method: method,
        headers: {
          ...header
        },
        credentials: "include" // gửi cookie nếu cần (ví dụ: đăng nhập)
      };

      if (data) {
        requestOptions.body = JSON.stringify(data);
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
