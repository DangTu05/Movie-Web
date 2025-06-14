import mongoose from "mongoose";
import dotenv from "./environment";
async function connect(): Promise<void> {
  try {
    await mongoose.connect(dotenv.MONGO_URL || "");
    // "mongodb://127.0.0.1:27017/Prj_Products"
    console.log("connect sucessfully!!!");
  } catch {
    console.log("connect failue!!!");
  }
}
export default connect;
