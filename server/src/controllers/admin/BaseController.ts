/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import sendResponse from "../../utils/handler/response";
import { StatusCodes } from "http-status-codes";
import logger from "../../configs/logger";
import errorHandler from "../../utils/handler/handleAsync";
import { IBaseService } from "../../interfaces/IBaseService";
abstract class BaseController<T extends IBaseService<TInput, TModel>, TInput, TModel> {
  constructor() {
    // Bọc các phương thức xử lý lỗi bất đồng bộ
    this.showView = errorHandler.handleAsyncErrors(this.showView.bind(this));
    this.create = errorHandler.handleAsyncErrors(this.create.bind(this));
    this.update = errorHandler.handleAsyncErrors(this.update.bind(this));
  }
  // Phương thức render để hiển thị view
  // Phương thức này sẽ được triển khai trong các controller con
  abstract render(req: Request, res: Response): Promise<void>;
  // Dịch vụ sẽ được inject từ bên ngoài
  // Ví dụ: ActorService, MovieService, CategoryService
  protected abstract service: T;
  // Optional: xử lý dữ liệu trước khi tạo
  protected extractDataFromRequest?(req: Request): TInput;
  // Phương thức validate sẽ được triển khai trong các controller con
  // Phương thức này sẽ sử dụng zod
  protected abstract validate(req: Request): { success: boolean; errors?: any };
  // Phương thức này sẽ hiển thị view tương ứng với controller
  // Ví dụ: create-movie, create-actor, create-category...
  public async showView(req: Request, res: Response, next: NextFunction) {
    await this.render(req, res);
  }
  // Phương thức này sẽ xử lý việc tạo mới một đối tượng
  public async create(req: Request, res: Response, next: NextFunction) {
    let data = req.body;
    if (this.extractDataFromRequest) {
      data = this.extractDataFromRequest(req);
      req.body = data; // gán lại body sau khi xử lý
    }
    const { success, errors } = this.validate(req);
    if (!success) {
      logger.error("Validation failed", errors);
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    await this.service.create(req.body);
    logger.info("Create operation successful");
    sendResponse(res, StatusCodes.CREATED, null, "Tạo thành công!", "Tạo thành công!");
  }
  // Phương thức này sẽ xử lý việc cập nhật một đối tượng
  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let data = req.body;
    if (this.extractDataFromRequest) {
      data = this.extractDataFromRequest(req);
      req.body = data; // gán lại body sau khi xử lý
    }
    const { success, errors } = this.validate(req);
    if (!success) {
      logger.error("Validation failed", errors);
      return sendResponse(res, 400, null, "Validation failed", errors);
    }
    const record = await this.service.update(id, req.body);
    logger.info("Update operation successful");
    sendResponse(res, StatusCodes.OK, record, "Cập nhật thành công!", "Cập nhật thành công!");
  }
}
export default BaseController;
