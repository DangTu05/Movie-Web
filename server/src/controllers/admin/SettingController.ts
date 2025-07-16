/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import getProvinces from "../../helpers/api/getProvinces";
import BaseController from "./BaseController";
import SettingService from "../../services/SettingService";
import { ISettingInput } from "../../interfaces/ISettingInput";
import { ISetting } from "../../models/schema/settingschema";
import logger from "../../configs/logger";
import SettingValidate from "../../validations/SettingValidate";
const _settingValidate = new SettingValidate();
class SettingController extends BaseController<SettingService, ISettingInput, ISetting> {
  constructor(private readonly settingService: SettingService) {
    super();
  }
  protected service: SettingService = this.settingService;
  public async render(req: Request, res: Response): Promise<void> {
    const viewName = req.params.view;
    const setting = await this.service.getSetting();
    const provinces = await getProvinces();
    logger.info("Rendering setting view");
    res.render(`admin/pages/${viewName}`, {
      provinces: provinces,
      setting: setting
    });
  }
  protected validate(req: Request) {
    return _settingValidate.validate(req);
  }
  protected extractDataFromRequest(req: Request) {
    const logo = (req.file as Express.Multer.File)?.path || "";
    req.body.logo = logo;
    return req.body as ISetting;
  }
}
export default SettingController;
