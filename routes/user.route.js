import express from "express";
import updateUserInfo from "../controllers/user.controller.js";

const router = express.Router();

router.post("/trainee", updateUserInfo);

export default router;
