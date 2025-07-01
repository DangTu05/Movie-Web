import accountModel from "../models/schema/accountSchema";
const existUsername = async (username: string) => {
  const account = await accountModel.findOne({ deleted: false, username: username }).select("_id");
  return !!account;
};
export { existUsername };
