import express from "express";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import { Telegraf } from "telegraf";
import connectMongoDB from "./db/connectMongoDB.js";
import socketService from "./services/socketService.js";

import AdminInfoModel from "./models/adminInfo.js";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import botRoute from "./routes/bot.route.js";
import messageRoute from "./routes/message.route.js";
import traineeRoute from "./routes/trainee.route.js";

import authenticateToken from "./middlewares/authenticate.js";
import cors from "cors";
import "dotenv/config";
import { addListeners } from "./controllers/socket.controller.js";

const app = express();
const server = http.createServer(app);
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

socketService.init(server);
addListeners();

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/bot", authenticateToken, botRoute);
app.use("/api/messages", authenticateToken, messageRoute);
app.use("/api/trainee", authenticateToken, traineeRoute);

// io.on("connection", (socket) => {
//   console.log("a user connected", socket);
// });

server.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  await connectMongoDB();
});

// телеграм бот
export const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start(async (ctx) => {
  try {
    const existOwner = await AdminInfoModel.find({ id: ctx.message.from.id });

    console.log(existOwner.name, existOwner);
    if (!existOwner.length) {
      const info = await AdminInfoModel.create({
        id: ctx.message.from.id,
        name: ctx.message.from.first_name,
      });

      ctx.reply(
        `Добро пожаловать ${info.name}. Вся информация по новим юзерам и поролям я скину сюда!`
      );
    } else {
      ctx.reply(
        `${ctx.message.from.first_name} вы уже зарегистрировани для получения информации!`
      );
    }
  } catch (err) {
    console.log("Erroor", err.message);
  }
});

bot.launch();
