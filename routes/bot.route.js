import express from "express";
import {
  createBot,
  getBots,
  deleteBot,
} from "../controllers/bot.controller.js";

const router = express.Router();

router.get("/", getBots);
router.post("/", createBot);
router.delete("/:id", deleteBot);

export default router;
