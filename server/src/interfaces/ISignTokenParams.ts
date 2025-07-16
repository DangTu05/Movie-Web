import jwt from "jsonwebtoken";
interface ISignTokenParams {
  payload: string | object | Buffer;
  privateKey?: string;
  option?: jwt.SignOptions;
}
export { ISignTokenParams };
