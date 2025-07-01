/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import BaseController from "./BaseController";
import { IAccountInput } from "../../interfaces/IAccountInput";
import { IAccount } from "../../models/schema/accountSchema";
import AccountService from "../../services/admin/AccountService";
import AccountValidate from "../../validations/AccountValidate";
import { removeSpcae } from "../../utils/removeSpace";
const _accountValidate = new AccountValidate();
class AccountController extends BaseController<AccountService, IAccountInput, IAccount> {
  private revides: any = {};
  // Chúng ta sẽ gán service sau khi thêm revide
  protected service!: AccountService; // Chắn chắn gán sau khi thêm revide
  constructor() {
    super();
  }
  // Phương thức này sẽ được gọi để thêm các dịch vụ vào MovieController
  // Ví dụ: MovieService, ActorService, CategoryService...
  public addRevide(key: string, revide: any) {
    this.revides[key] = revide;
    // Gán service nếu revide là MovieService
    if (revide instanceof AccountService) {
      this.service = revide;
    }
  }
  // Xác thực dữ liệu từ request bằng zod
  // Trả về { success: boolean, errors?: any } để thông báo kết quả
  protected validate(req: Request): { success: boolean; errors?: any } {
    return _accountValidate.validate(req);
  }
  // Xử lý dữ liệu từ request để tạo account
  protected extractDataFromRequest(req: Request) {
    req.body.username = removeSpcae(req.body.username);
    return req.body as IAccountInput;
  }
  async render(req: Request, res: Response) {
    const roles = await this.revides["roleService"].getRole();
    const viewName = req.params.view || "create-account";
    res.render(`admin/pages/${viewName}`, {
      roles: roles || []
    });
  }
}
export default AccountController;
