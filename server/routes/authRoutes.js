import { Router } from "express";
import { register, login, forgotPassword, resetPassword, getMe } from "../controllers/authController.js"; 

const router = Router();

// specify the authentification and authorization routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;