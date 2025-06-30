import accountModel from "../models/schema/accountSchema";

const existEmail = (email: string) => {
  const account = accountModel.findOne({ deleted: false, email: email }).select("_id");
  return !!account;
};
export { existEmail };
