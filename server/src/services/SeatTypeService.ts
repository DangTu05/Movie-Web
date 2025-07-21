import BaseService from "./BaseService";
import { ISeatTypeInput } from "../interfaces/ISeatTypeInput";
import seattypeModel, { ISeatType } from "../models/schema/seattypeSchema";
class SeatTypeService extends BaseService<ISeatType, ISeatTypeInput> {
  protected model = seattypeModel;
  protected async checkId(id: string): Promise<void> {
    return;
  }
}
export default SeatTypeService;
