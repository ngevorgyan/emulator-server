import { model, Schema } from "mongoose";

const messagesStatus = new Schema({
  room: String,
  status: {
    type: String,
    enum: ["play", "pause", "finished"],
  },
});

const MessagesStatusModel = model("MessagesStatus", messagesStatus);

export default MessagesStatusModel;
