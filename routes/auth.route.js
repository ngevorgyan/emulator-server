import express from "express";
import {
  loginTrainee,
  loginAdmin,
  checkMe,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/admin", loginAdmin);
router.post("/trainee", loginTrainee);
router.get("/me", authenticateToken, checkMe);

export default router;
