import express from "express";
import {
  authLogin,
  authLogout,
} from "../controllers/authController.js";
import {
  ensureAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/", authLogin);
router.get("/logout", ensureAuthenticated, authLogout);
export default router;
