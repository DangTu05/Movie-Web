import { Response } from "express";
const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data?: T,
  message: string = "",
  messages: string | string[] = ""
) => {
  res.status(statusCode).json({
    message: message,
    messages: messages,
    data: data
  });
};
export default sendResponse;
