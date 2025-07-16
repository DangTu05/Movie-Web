import mongoose from "mongoose";
import accountModel, { IAccount } from "../models/schema/accountSchema";
import userModel from "../models/schema/userSchema";
import roleModel from "../models/schema/roleSchema";
import { IAccountInput } from "../interfaces/IAccountInput";
import { existEmail } from "../helpers/existEmail";
import { existUsername } from "../helpers/existUsername";
import { hashPassword } from "../utils/passwordUtil";
import BaseService from "./BaseService";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import logger from "../configs/logger";
import { existAccount } from "../helpers/existAccount";
import { existRole } from "../helpers/existRole";
import { IPagination } from "../interfaces/IPagination";
import Constants from "../utils/Constant";
class AccountService extends BaseService<IAccount, IAccountInput> {
  protected model = accountModel;
  public async create(data: IAccountInput) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Kiểm tra email
      const emailExists = await existEmail(data.email);
      if (emailExists) throw new ApiError(StatusCodes.BAD_REQUEST, "Email đã tồn tại");
      // Kiểm tra username
      const usernameExists = await existUsername(data.username);
      if (usernameExists) throw new ApiError(StatusCodes.BAD_REQUEST, "Username đã tồn tại");
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
      // Commit transaction
      await session.commitTransaction();
    } catch (err) {
      // Rollback transaction
      await session.abortTransaction();
      throw err;
    } finally {
      // Kết thúc phiên
      await session.endSession();
    }
  }
  protected async convertData(data: IAccountInput) {
    await existRole(data.role_id);
    const dataUpdate: Partial<IAccount> = {
      username: data.username,
      email: data.email,
      password: data.password,
      role_id: new mongoose.Types.ObjectId(data.role_id)
    };
    if (data.password) dataUpdate.password = await hashPassword(data.password);
    else delete dataUpdate.password;
    return dataUpdate;
  }
  protected async checkId(id: string): Promise<void> {
    await existAccount(id);
  }
  public async findAccountById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn("Id tài khoản người dùng gửi lên không hợp lệ!", { id });
      return;
    }
    const data = await this.model
      .findOne({ _id: id })
      .populate("role_id")
      .select("user_id username email role_id")
      .lean();
    return data;
  }
  public async getAllAccount(pagination?: IPagination) {
    if (!pagination) {
      const accounts: IAccount[] = await this.model
        .find({ deleted: false })
        .select(Constants.COMMON_SELECT_FIELDS)
        .lean()
        .populate("role_id")
        .populate("user_id");
      if (accounts.length === 0) {
        logger.info("No accounts found");
      }
      return accounts;
    } else {
      const [accounts, count] = await Promise.all([
        this.model
          .find({ deleted: false })
          .select(Constants.COMMON_SELECT_FIELDS)
          .populate({
            path: "role_id",
            select: "role_name" // 🔥lấy field role_name
          })
          .populate({
            path: "user_id",
            select: "_id"
          })
          .skip(pagination.skip)
          .limit(pagination.limit)
          .lean(), // <- lean được gọi cuối cùng, sau khi hoàn tất populate và paging,
        this.model.countDocuments({ deleted: false })
      ]);
      pagination.count = count;
      pagination.totalPage = Math.ceil(count / pagination.limit);
      return {
        pagination: {
          ...pagination
        },
        accounts
      };
    }
  }
}
export default AccountService;
