import { Request, Response, NextFunction } from "express";
import getProvinces from "../../helpers/api/getProvinces";
class SettingController {
  public async render(req: Request, res: Response): Promise<void> {
    const provinces = await getProvinces();
    res.render("admin/pages/setting", {
      provinces: provinces
    });
  }
}
export default SettingController;
