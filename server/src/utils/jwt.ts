import { TokenType } from "../constants/enum";
import { ISignTokenParams } from "../interfaces/ISignTokenParams";
import env from "../configs/environment";
import jwt from "jsonwebtoken";

const expireToken: string = env.ACCESS_TOKEN_EXPIRES_IN ?? "10p"; // 1op
const expireRefreshToken: string = env.REFRESH_TOKEN_EXPIRES_IN ?? "7d"; // 7 ngày
const jwt_secret: string = env.JWT_SECRET ?? "dangquangtu77";
const signToken = ({
  payload,
  privateKey = env.JWT_SECRET as string,
  option = { algorithm: "HS256" }
}: ISignTokenParams): Promise<string> => {
  const isAccessToken = typeof payload === "object" && "type" in payload && payload.type === TokenType.AccessToken;
  const expiresIn = isAccessToken ? expireToken : expireRefreshToken;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { ...option, expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }, (err, token) => {
      if (err || !token) return reject(err || new Error("Failed to sign token"));
      resolve(token);
    });
  });
};

const verifyToken = async ({
  token,
  privateKey = jwt_secret
}: {
  token: string;
  privateKey?: string;
}): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) return reject(err);
      if (!decoded) return reject(new Error("Failed to verify token"));
      resolve(decoded as jwt.JwtPayload);
    }) as void;
  });
};

export { signToken, verifyToken };
