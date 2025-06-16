import mongoose from "mongoose";
import dotenv from "./environment";
async function connect(): Promise<void> {
  try {
    if (!dotenv.MONGO_URL) throw new Error("Missing MONGO_URI in .env");
    await mongoose.connect(dotenv.MONGO_URL);
    // "mongodb://127.0.0.1:27017/Prj_Products"
    console.log("connect sucessfully!!!");
  } catch {
    console.log("connect failue!!!");
  }
}
export default connect;
