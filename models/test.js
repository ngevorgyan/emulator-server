import { model, Schema } from "mongoose";

const testQuestionsSchema = new Schema({
  questions: [String],
});

const TestQuestionsModel = model("TestQuestions", testQuestionsSchema);

export default TestQuestionsModel;
