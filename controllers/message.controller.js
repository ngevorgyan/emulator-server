import MessageModel from "../models/message.js";
import BotModel from "../models/bot.js";
import TestModel from "../models/test.js";

import getRandomItem from "../utiles/getRandomItem.js";
import UserModel from "../models/user.js";
import TestAnswerModel from "../models/testAnswer.js";
import { sendNewMessage, updateMessStatus } from "./socket.controller.js";
import MessagesStatusModel from "../models/messengerStatus.js";
import { updateOrCreateMesssageStatus } from "../services/updateOrCreateMesssageStatus.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, receiver } = req.body;

    const newMessage = await MessageModel.create({
      sender: req.user._id,
      receiver,
      content: message,
      status: "read",
    });

    sendNewMessage(`${newMessage.sender}-${newMessage.receiver}`);
    sendNewMessage(`${newMessage.receiver}-${newMessage.sender}`);
    res.status(200).json(newMessage);
  } catch (err) {
    console.log("sendMessage", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const answerMessage = async (req, res) => {
  try {
    const { receiver, isFirst } = req.body;
    const bot = await BotModel.findOne({ _id: receiver }).populate("level");

    const messages = await MessageModel.find({ sender: receiver }).distinct(
      "content"
    );
    const arr = bot.level.questions.filter((item) => !messages.includes(item));

    if (!arr.length) {
      await updateOrCreateMesssageStatus({
        botId: receiver,
        traineeId: req.user._id,
        status: "finish",
      });
      return res.status(200).json({ isFinished: true });
    }
    const content = getRandomItem(arr);

    let newMessage = await MessageModel.create({
      sender: receiver,
      receiver: req.user._id,
      status: "read",
      content: isFirst ? bot.level.questions[0] : content,
    });
    sendNewMessage(`${newMessage.sender}-${newMessage.receiver}`);
    sendNewMessage(`${newMessage.receiver}-${newMessage.sender}`);
    res.status(200).json(newMessage);
  } catch (err) {
    console.log("answerMessage", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiver } = req.params;

    // const bot = await BotModel.findOne({ _id: receiver }).populate("level");

    const messages = await MessageModel.find({
      $or: [
        { sender: req.user._id, receiver },
        { sender: receiver, receiver: req.user._id },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("getMessages", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { botId } = req.params;
    const { user } = req;
    const messages = await MessageModel.find({
      $or: [
        { sender: user._id, receiver: botId },
        { sender: botId, receiver: user._id },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("getConversation", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTests = async (_, res) => {
  try {
    const tests = await TestModel.find({}).distinct("questions");
    console.log(tests);
    res.status(200).json(tests);
  } catch (err) {
    console.log("getConversation", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveTests = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user._id });
    const tests = await TestAnswerModel.create(req.body);
    user.test = tests;
    user.save();
    res.status(200).json(tests);
  } catch (err) {
    console.log("getConversation", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStatus = async (req, res) => {
  try {
    const { botId, traineeId } = req.query;
    const room = `${traineeId}-${botId}`;

    const statusInfo = await MessagesStatusModel.findOne({ room });

    res.status(200).json(statusInfo);
  } catch (err) {
    console.log("getStatus", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { botId, traineeId, status } = req.body;
    const room = `${traineeId}-${botId}`;
    await updateOrCreateMesssageStatus({
      botId,
      traineeId,
      status,
    });

    updateMessStatus(`${traineeId}-${botId}`, status);

    const statusInfo = await MessagesStatusModel.findOne({ room });

    res.status(200).json(statusInfo);
  } catch (err) {
    console.log("updateStatus", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
