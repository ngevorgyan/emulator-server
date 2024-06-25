import TestModel from "../models/test.js";
import { testQuestions } from "./constants.js";

async function createTest() {
  try {
    const isExistTests = await TestModel.find({});

    if (!isExistTests.length) {
      await TestModel.create({ questions: testQuestions });

      console.log("Test questions added!!!!! \n -------------------");
    } else {
      console.log("Test questions olready exist!!!!! \n -------------------");
    }
  } catch (err) {
    throw Error("Error in Create Tests Model", "===>", err.message);
  }
}

export default createTest;
