import { Application } from "express";
import homeRoutes from "./home";
function router(app: Application) {
  app.use("/", homeRoutes);
}
export default router;
