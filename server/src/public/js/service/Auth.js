import HttpClient from "../core/HttpClient.js";
import { httpMethods, httpHeaders } from "../shared/config.js";
class AuthServices {
  constructor() {
    this.httpClient = new HttpClient();
  }
  async registerUser(data) {
    return await this.httpClient.request("auth/register", httpMethods.POST, httpHeaders.content.json, data);
  }
  async loginUser(data) {
    return await this.httpClient.request("auth/login", httpMethods.POST, httpHeaders.content.json, data);
  }
}
export default AuthServices;
