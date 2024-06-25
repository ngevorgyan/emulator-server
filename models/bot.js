import { model, Schema } from "mongoose";

const botSchema = new Schema({
  name: String,
  level: { type: Schema.Types.ObjectId, ref: "Level" },
});

const BotModel = model("Bot", botSchema);

export default BotModel;
