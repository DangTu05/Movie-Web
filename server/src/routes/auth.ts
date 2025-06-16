import express, { Router } from "express";
import RegisterController from "../controllers/auth/RegisterController";
import { RegisterService } from "../services/auth/registerService"; // Adjust the import path as necessary
const router: Router = express.Router();
const registerService = new RegisterService();
const registerController = new RegisterController(registerService);
router.post("/register", registerController.register);

export default router;
