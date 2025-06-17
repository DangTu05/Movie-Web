import express, { Router } from "express";
import RegisterController from "../controllers/auth/RegisterController";
import { RegisterService } from "../services/auth/RegisterService"; // Adjust the import path as necessary
import { LoginService } from "../services/auth/LoginService"; // Adjust the import path as necessary
import LoginController from "../controllers/auth/LoginController";
const router: Router = express.Router();
const registerService = new RegisterService();
const registerController = new RegisterController(registerService);
const loginService = new LoginService();
const loginController = new LoginController(loginService);
router.get("/register", registerController.showViewRegister);
router.get("/login", loginController.showViewLogin);
router.post("/register", registerController.register);
router.post("/login", loginController.login);
export default router;
