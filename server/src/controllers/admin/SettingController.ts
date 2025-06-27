import { Request, Response, NextFunction } from "express";
import getProvinces from "../../helpers/api/getProvinces";
import BaseController from "./BaseController";
import SettingService from "../../services/admin/SettingService";
import { ISettingInput } from "../../interfaces/ISettingInput";
import { ISetting } from "../../models/schema/settingschema";
import logger from "../../configs/logger";
import SettingValidate from "../../validations/SettingValidate";
const _settingValidate = new SettingValidate();
class SettingController extends BaseController<SettingService, ISettingInput, ISetting> {
  constructor(private readonly settingService: SettingService) {
    super();
  }
  public async render(req: Request, res: Response): Promise<void> {
    const provinces = await getProvinces();
    logger.info("Rendering setting view");
    res.render("admin/pages/setting", {
      provinces: provinces
    });
  }
  protected service: SettingService = this.settingService;
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _settingValidate.validate(req);
  }
  protected extractDataFromRequest(req: Request): ISetting {
    const files = (req.file as Express.Multer.File)?.path || "";
    const logo = (req.file as Express.Multer.File)?.path || "";
    req.body.logo = logo;
    return req.body as ISetting;
  }
}
export default SettingController;
