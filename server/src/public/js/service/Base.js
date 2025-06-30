import HttpClient from "../core/HttpClient.js";
import { httpMethods, httpHeaders } from "../shared/config.js";
class BaseService {
  constructor() {
    this.httpClient = new HttpClient();
  }
  async create(data, enpoint) {
    return await this.httpClient.request(enpoint, httpMethods.POST, httpHeaders.content.json, data);
  }
  async update(data, enpoint) {
    return await this.httpClient.request(enpoint, httpMethods.PATCH, httpHeaders.content.json, data);
  }
}
export default BaseService;
