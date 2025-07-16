import settingModel, { ISetting } from "../models/schema/settingschema";
import BaseService from "./BaseService";
import { ISettingInput } from "../interfaces/ISettingInput";
import Constants from "../utils/Constant";
class SettingService extends BaseService<ISetting, ISettingInput> {
  protected model = settingModel;
  override async create(data: ISettingInput) {
    const setting = await settingModel.findOne({ website_name: data.website_name });
    if (setting) {
      await settingModel.updateOne({ website_name: data.website_name }, data);
      return;
    }
    return super.create(data);
  }
  protected async checkId(id: string): Promise<void> {
    return;
  }
  public async getSetting(): Promise<ISetting | null> {
    const setting = await settingModel.findOne({ deleted: false }).select(Constants.COMMON_SELECT_FIELDS).lean();
    return setting;
  }
}
export default SettingService;
