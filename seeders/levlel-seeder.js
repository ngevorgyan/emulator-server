import LevelModel from "../models/level.js";
import { easyQuestions, mediumQuestions, hardQuestions } from "./constants.js";

async function createLevels() {
  try {
    const isExistLevels = await LevelModel.find({ number: "Easy" });

    if (!isExistLevels.level) {
      await LevelModel.create([
        { name: "Easy", numberId: 1, questions: easyQuestions },
        { name: "Medium", numberId: 2, questions: mediumQuestions },
        { name: "Hard", numberId: 3, questions: hardQuestions },
      ]);

      console.log("Level questions added!!!!! \n -------------------");
    } else {
      console.log("Level questions olready exixt!!!!! \n -------------------");
    }
  } catch (err) {
    throw Error("Error in Create Levels Model!", err.message);
  }
}

export default createLevels;
