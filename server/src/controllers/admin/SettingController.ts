import { Request, Response, NextFunction } from "express";
class SettingController {
  public async render(req: Request, res: Response): Promise<void> {
    res.render("admin/pages/setting");
  }
}
export default SettingController;
