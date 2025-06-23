import { Request, Response, NextFunction } from "express";

abstract class BaseController {
  abstract render(req: Request, res: Response): Promise<void>;

  public showView = async (req: Request, res: Response): Promise<void> => {
    await this.render(req, res);
  };
}
export default BaseController;
