import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/handler/handleAsync";
abstract class BaseController {
  constructor() {
    // Bọc các phương thức xử lý lỗi bất đồng bộ
    this.showView = errorHandler.handleAsyncErrors(this.showView.bind(this));
  }
  abstract render(req: Request, res: Response): Promise<void>;
  public async showView(req: Request, res: Response, next: NextFunction) {
    await this.render(req, res);
  }
}
export default BaseController;
