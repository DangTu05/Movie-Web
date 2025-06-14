import dotenv from "dotenv";
dotenv.config();
const env = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  BUILD_MODE: process.env.BUILD_MODE
};
export default env;
export type Environment = typeof env;
