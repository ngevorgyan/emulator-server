import UserModel from "../models/user.js";

async function updateUserInfo(req, res) {
  try {
    const { fullName, id } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { fullName } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error in updateUserInfo", err.message);
    res.status(500).json({ message: "Server error" });
  }
}
export default updateUserInfo;
