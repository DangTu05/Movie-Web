/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { IBaseService } from "../interfaces/IBaseService";
import { Model, UpdateQuery } from "mongoose";
import ApiError from "../utils/ApiError";
import Constants from "../utils/Constant";
abstract class BaseService<TModel, TInput> implements IBaseService<TInput, TModel> {
  protected abstract model: Model<TModel>;
  protected convertData?(data: TInput): Promise<Partial<TModel> | TModel>;
  protected checkExist?(data: TInput): Promise<void>;
  protected abstract checkId(id: string): Promise<void>;
  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  public async create(data: TInput) {
    // Kiểm tra xem dữ liệu có hợp lệ hay không
    if (this.checkExist) {
      await this.checkExist(data);
    }
    const recordData = this.convertData ? await this.convertData(data) : data;
    const newModel = new this.model(recordData);
    await newModel.save();
  }

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract findAll(): Promise<any[]>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract findById(id: string): Promise<any>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  public async update(id: string, data: TInput): Promise<TModel> {
    await this.checkId(id);
    const recordData = this.convertData ? await this.convertData(data) : data;
    const updateQuery: UpdateQuery<TModel> = { $set: recordData as Partial<TModel> }; //chỉ cập nhật các field có trong recordData, không xóa hay thay thế document gốc.
    const updated = await this.model
      .findByIdAndUpdate(id, updateQuery, {
        new: true,
        returnDocument: "after" // ✅ cách rõ ràng hơn
      })
      .select(Constants.COMMON_SELECT_FIELDS)
      .lean();
    // Kiểm tra null để tránh lỗi runtime
    if (!updated) throw new ApiError(StatusCodes.NOT_FOUND, "Không tìm thấy bản ghi để cập nhật");
    return updated as TModel;
  }

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  public async delete(id: string): Promise<void> {
    await this.checkId(id);
    await this.model.findByIdAndUpdate(id, { deleted: true });
  }
}
export default BaseService;
