import { model, Schema } from "mongoose";

const testAnswerSchema = new Schema(
  {
    answer: { type: String, require: false },
    question: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const TestAnswerModel = model("TestAnswer", testAnswerSchema);

export default TestAnswerModel;
