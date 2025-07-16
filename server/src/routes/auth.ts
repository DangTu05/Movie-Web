import express, { Router } from "express";
import AuthService from "../services/AuthService"; // Adjust the import path as necessary
import AuthController from "../controllers/common/AuthController";
const router: Router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);
router.get("/register", authController.showViewRegister);
router.get("/login", authController.showViewLogin);
router.post("/register", authController.register);
router.post("/login", authController.login);
export default router;
