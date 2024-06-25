import express from "express";
import {
  sendMessage,
  getMessages,
  getConversation,
  answerMessage,
  getTests,
  saveTests,
  getStatus,
  updateStatus,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/get-status", getStatus);
router.post("/update-status", updateStatus);
router.post("/answer", answerMessage);
router.post("/send", sendMessage);
router.get("/tests", getTests);
router.post("/tests", saveTests);
router.get("/conversation/:botId", getConversation);
router.get("/:send", getMessages);

export default router;
