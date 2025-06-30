import accountModel, { IAccount } from "../../models/schema/accountSchema";
import { IAccountInput } from "../../interfaces/IAccountInput";
import BaseService from "./BaseService";
class AccountService extends BaseService<IAccount, IAccountInput> {
  protected model = accountModel;
}
export default AccountService;
