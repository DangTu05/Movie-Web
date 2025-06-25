export interface IBaseService<TInput = any, TModel = any> {
  create(data: TInput): Promise<void>;
  // update(id: string, data: TInput): Promise<TModel>;
  // delete(id: string): Promise<void>;
  // findById(id: string): Promise<TModel | null>;
}
