import UserModel from "../models/user.js";
import passGenerator, { loginGenerator } from "../utiles/passGenerator.js";

export async function createTrainee(_, res) {
  try {
    const password = passGenerator();
    const userName = loginGenerator();

    const trainee = await UserModel.create({
      password: password,
      userName,
      bots: [],
    });

    res.status(200).json({ trainee });
  } catch (err) {
    console.log("error in createTrainee", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateTrainee(req, res) {
  try {
    const { fullName, ...data } = req.body;
    const user = req.user;

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: { fullName, ...data } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error in createTrainee", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getTrainees(_, res) {
  try {
    const trainees = await UserModel.find({ isAdmin: false }).populate("bots");

    res.status(200).json(trainees);
  } catch (err) {
    console.log("error in createTrainee", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getTrainee(req, res) {
  try {
    const { id } = req.params;
    const trainee = await UserModel.findOne({
      isAdmin: false,
      _id: id,
    }).populate("bots");

    res.status(200).json(trainee);
  } catch (err) {
    console.log("error in createTrainee", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export const deleteTrainee = async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await UserModel.findByIdAndDelete(id);
    res.status(200).json(bot);
  } catch (err) {
    console.log("error in getBots", err.message);
  }
};
