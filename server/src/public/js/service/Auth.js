import HttpClient from "../core/HttpClient.js";
import { httpMethods, httpHeaders } from "../shared/config.js";
class AuthServices {
  constructor() {
    this.httpClient = new HttpClient();
  }
  async registerUser(data) {
    try {
      const response = await this.httpClient.request("auth/register", httpMethods.POST, httpHeaders.content.json, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default AuthServices;
//
