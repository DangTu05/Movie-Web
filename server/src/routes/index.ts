import { Application } from "express";
import authRoutes from "./auth";
function router(app: Application): void {
  app.use("/auth", authRoutes);
}
export default router;
