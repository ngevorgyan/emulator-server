import { Server as socketIO } from "socket.io";

class SocketService {
  constructor() {
    this.io = null;
  }

  init(server) {
    if (!this.io) {
      this.io = new socketIO(server, {
        cors: {
          // origin: "http://localhost:5173",
          origin: "https://emulator-front.netlify.app",
          methods: ["GET", "POST"],
        },
      });
      this.io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });

        // Additional event handlers can be defined here
      });
    }
  }

  getIO() {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }
}

export default new SocketService();
