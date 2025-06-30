import actorModel from "../models/schema/actorSchema";
const existActor = async (actorId: string): Promise<boolean> => {
  const actor = await actorModel.findById(actorId).select("_id").lean(); //Chuyển kết quả từ Mongoose Document thành Plain JavaScript Object, object (thường nhẹ hơn document)
  if (!actor) {
    return false;
  }
  return true;
};
export { existActor };
