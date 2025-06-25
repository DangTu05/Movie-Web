import { IBaseService } from "../../interfaces/IBaseService";
import { Model } from "mongoose";
abstract class BaseService<TModel, TInput> implements IBaseService<TInput, TModel> {
  protected abstract model: Model<TModel>;
  protected checkExists?(data: TInput): Promise<Partial<TModel> | TModel>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  public async create(data: TInput): Promise<void> {
    // Kiểm tra xem dữ liệu có hợp lệ hay không

    if (this.checkExists) {
      const recordData = await this.checkExists(data);
      const newModel = new this.model(recordData);
      await newModel.save();
    } else {
      const newModel = new this.model(data);
      await newModel.save();
    }
  }

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract findAll(): Promise<any[]>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract findById(id: string): Promise<any>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract update(id: string, data: any): Promise<void>;

  // Phương thức này sẽ được triển khai trong các service con
  // Ví dụ: ActorService, MovieService, CategoryService
  // abstract delete(id: string): Promise<void>;
}
export default BaseService;
