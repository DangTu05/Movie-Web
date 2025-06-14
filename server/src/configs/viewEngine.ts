import path from "path";
import { Express } from "express";
const configViewEngine = (app: Express) => {
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "..", "views"));
};
export default configViewEngine;
