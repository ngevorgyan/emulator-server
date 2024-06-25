import { Telegraf } from "telegraf";
import AdminInfoModel from "../models/adminInfo.js";

async function sendInfo(message) {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
  try {
    const owners = await AdminInfoModel.find({});
    if (owners.length) {
      bot.launch();
      await bot.telegram.sendMessage(owners[0].id, message);
      bot.stop();
    }
  } catch (err) {
    console.log("Errrr. sendInfo", err.message);
  }
}

export default sendInfo;
