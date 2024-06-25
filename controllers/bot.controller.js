import BotModel from "../models/bot.js";
import LevelModel from "../models/level.js";

export const createBot = async (req, res) => {
  try {
    const { numberId, name } = req.body;

    const curLevel = await LevelModel.findOne({ numberId });

    const bot = await (
      await BotModel.create({ name, level: curLevel._id })
    ).populate("level");

    res.status(200).json(bot);
  } catch (err) {
    console.log("error in createBot", err.message);
  }
};

export const getBots = async (_, res) => {
  try {
    const bots = await BotModel.find({}).populate("level");

    res.status(200).json(bots);
  } catch (err) {
    console.log("error in getBots", err.message);
  }
};

export const deleteBot = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const bot = await BotModel.findByIdAndDelete(id);
    res.status(200).json(bot);
  } catch (err) {
    console.log("error in getBots", err.message);
  }
};
