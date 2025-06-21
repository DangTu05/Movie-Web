import { Application } from "express";
import authRoutes from "./auth";
import movieRoutes from "./movie";
import actorRoutes from "./actor";
import systemConfig from "../configs/system";
const PATH_ADMIN = systemConfig.prefixAdmin;
function router(app: Application): void {
  app.use("/auth", authRoutes);
  app.use(`${PATH_ADMIN}/movie`, movieRoutes);
  app.use(`${PATH_ADMIN}/actor`, actorRoutes);
}
export default router;
