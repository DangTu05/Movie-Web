import mongoose from "mongoose";
import accountModel, { IAccount } from "../../models/schema/accountSchema";
import userModel from "../../models/schema/userSchema";
import roleModel from "../../models/schema/roleSchema";
import { IAccountInput } from "../../interfaces/IAccountInput";
import { existEmail } from "../../helpers/existEmail";
import { hashPassword } from "../../utils/passwordUtil";
import BaseService from "./BaseService";
import ApiError from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";
class AccountService extends BaseService<IAccount, IAccountInput> {
  protected model = accountModel;
  public async create(data: IAccountInput): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Tạo user
      const user = await userModel.create([{}], { session });

      // Kiểm tra role
      const roleExists = await roleModel.exists({ _id: data.role_id }).session(session);
      if (!roleExists) throw new ApiError(StatusCodes.BAD_REQUEST, "Role không tồn tại");

      // Tạo account liên kết với user
      await this.model.create(
        [
          {
            username: data.username,
            email: data.email,
            password: await hashPassword(data.password),
            role_id: new mongoose.Types.ObjectId(data.role_id),
            user_id: user[0]._id
          }
        ],
        { session }
      );
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }
}
export default AccountService;
