import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import logger from "../../configs/logger";
import errorHandler from "../../utils/handler/handleAsync";
import RoleValidate from "../../validations/RoleValidate";
import sendResponse from "../../utils/handler/response";
import { StatusCodes } from "http-status-codes";
