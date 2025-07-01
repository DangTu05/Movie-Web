import accountModel from "../models/schema/accountSchema";

const existEmail = async (email: string) => {
  const account = await accountModel.findOne({ deleted: false, email: email }).select("_id");
  return !!account;
};
export { existEmail };
