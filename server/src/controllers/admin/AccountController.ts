/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import BaseController from "./BaseController";
import { IAccountInput } from "../../interfaces/IAccountInput";
import { IAccount } from "../../models/schema/accountSchema";
import AccountService from "../../services/admin/AccountService";
import AccountValidate from "../../validations/AccountValidate";
import { removeSpace } from "../../utils/removeSpace";
import sendResponse from "../../utils/handler/response";
import errorHandler from "../../utils/handler/handleAsync";
import logger from "../../configs/logger";
const _accountValidate = new AccountValidate();
class AccountController extends BaseController<AccountService, IAccountInput, IAccount> {
  private revides: Record<string, any> = {};
  // Chúng ta sẽ gán service sau khi thêm revide
  protected service!: AccountService; // Chắn chắn gán sau khi thêm revide
  constructor() {
    super();
    this.update = errorHandler.handleAsyncErrors(this.update.bind(this));
  }
  // Ghi đè phương thức update(Do update có thể ko cần gửi mk)
  public override async update(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const updated = await this.service.update(req.params.id, data);
    // Ko trả về cho client password
    const { password, ...safeData } = updated;
    logger.info("Update operation successful", { updated });
    sendResponse(res, 200, safeData, "Cập nhật thành công!", "");
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
    req.body.username = removeSpace(req.body.username);
    return req.body as IAccountInput;
  }
  async render(req: Request, res: Response) {
    const data: any = {};
    const viewNames = ["create-account", "update-account"];
    const viewName = req.params.view;
    if (viewNames.includes(viewName)) {
      data.roles = await this.revides["roleService"].getRole();
      data.title = viewName === "create-account" ? "Create Account" : "Update Account";
    }
    if (viewName === "update-account") {
      if (!req.params.id) {
        return res.redirect("/admin/accounts");
      }
      data.account = await this.revides["accountService"].findAccountById(req.params.id);
      if (!data.account) {
        return res.redirect("/admin/accounts");
      }
    }
    const actualView = viewNames.includes(viewName) ? "create-account" : viewName;
    res.render(`admin/pages/${actualView}`, {
      data: data
    });
  }
}
export default AccountController;
