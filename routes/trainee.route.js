import express from "express";
import {
  createTrainee,
  updateTrainee,
  getTrainees,
  deleteTrainee,
  getTrainee,
} from "../controllers/trainee.controller.js";

const router = express.Router();

router.post("/", createTrainee);
router.delete("/:id", deleteTrainee);
router.get("/:id", getTrainee);
router.get("/", getTrainees);
router.patch("/:id", updateTrainee);

export default router;
