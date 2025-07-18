import { Application } from "express";
import authRoutes from "../auth";
import movieRoutes from "./movie";
import actorRoutes from "./actor";
import categoryRoutes from "./category";
import voucherRoutes from "./voucher";
import settingRoutes from "./setting";
import systemConfig from "../../configs/system";
import roleRoutes from "./role";
import accountRoutes from "./account";
import articleRoutes from "./article";
const PATH_ADMIN = systemConfig.prefixAdmin;
function router(app: Application): void {
  app.use("/auth", authRoutes);
  app.use(`${PATH_ADMIN}/movie`, movieRoutes);
  app.use(`${PATH_ADMIN}/actor`, actorRoutes);
  app.use(`${PATH_ADMIN}/category`, categoryRoutes);
  app.use(`${PATH_ADMIN}/voucher`, voucherRoutes);
  app.use(`${PATH_ADMIN}/setting`, settingRoutes);
  app.use(`${PATH_ADMIN}/role`, roleRoutes);
  app.use(`${PATH_ADMIN}/account`, accountRoutes);
  app.use(`${PATH_ADMIN}/article`, articleRoutes);
}
export default router;
