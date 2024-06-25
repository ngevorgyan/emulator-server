import { model, Schema } from "mongoose";

const levelSchema = new Schema({
  name: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  numberId: Number,
  questions: [String],
});

const LevelModel = model("Level", levelSchema);

export default LevelModel;
