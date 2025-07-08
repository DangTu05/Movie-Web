import { IPagination } from "../../interfaces/IPagination";

interface IQuery {
  page?: string;
}

const pagination = (params: IPagination, query: IQuery, count: number): IPagination => {
  const currentPage = Math.max(parseInt(query.page || "1"), 1);
  const skip = (currentPage - 1) * params.limit;
  const totalPage = Math.ceil(count / params.limit);

  return {
    ...params,
    currentPage,
    skip,
    totalPage,
    count
  };
};

export { pagination };
