import socketService from "../services/socketService.js";
import MessageModel from "../models/message.js";

function addListeners() {
  const io = socketService.getIO();

  io.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on("join-room", (roomName) => {
      socket.join(roomName);
    });

    socket.on("getMessages", async (data) => {
      try {
        const { botId, traineeId } = data;
        if (botId && traineeId) {
          const messages = await MessageModel.find({
            $or: [
              { sender: botId, receiver: traineeId },
              { sender: traineeId, receiver: botId },
            ],
          }).sort({ timestamp: 1 });
          socket.join(`${traineeId}-${botId}`);
          io.emit("messageList", messages);
        }
      } catch (err) {
        console.log("err=======>", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
    });
  });
}

function sendNewMessage(room) {
  const io = socketService.getIO();
  io.to(room).emit("newMessage", room);
}
function updateMessStatus(room, status) {
  const io = socketService.getIO();
  io.to(room).emit("updateStatus", status);
}

export { addListeners, sendNewMessage, updateMessStatus };
