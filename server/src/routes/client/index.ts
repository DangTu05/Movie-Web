import { Application } from "express";
import homeRoutes from "./home";
import movieRoutes from "./movie";
function router(app: Application) {
  app.use("/", homeRoutes);
  app.use("/", movieRoutes);
}
export default router;
