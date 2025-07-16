import dotenv from "dotenv";
dotenv.config();
const env = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  BUILD_MODE: process.env.BUILD_MODE,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  BASE_URL: process.env.BASE_URL,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET: process.env.JWT_SECRET
};
export default env;
export type Environment = typeof env;
