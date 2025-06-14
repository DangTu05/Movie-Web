import express, { Express } from "express";
import { Server } from "http";
import exitHook from "async-exit-hook";
import cors from "cors";
const app: Express = express();
const port: number | string = 3000;
let server: Server;
const startServer = (): Server => {
  app.use(cors());
  // Middleware xử lý JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};
/// anonymous async function(IIFE)
(async (): Promise<void> => {
  try {
    server = startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
