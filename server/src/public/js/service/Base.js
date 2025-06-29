import HttpClient from "../core/HttpClient.js";
import { httpMethods, httpHeaders } from "../shared/config.js";
class BaseService {
  constructor() {
    this.httpClient = new HttpClient();
  }
  async create(data, enpoint) {
    try {
      const response = await this.httpClient.request(enpoint, httpMethods.POST, httpHeaders.content.json, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(data, enpoint) {
    try {
      const response = await this.httpClient.request(enpoint, httpMethods.PATCH, httpHeaders.content.json, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default BaseService;
