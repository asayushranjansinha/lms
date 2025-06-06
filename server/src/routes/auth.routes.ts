import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from "@/controllers/auth.controllers";
import { protect } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", protect, logoutUserController);
router.post("/refresh-token", refreshTokenController);

export { router as authRouter };