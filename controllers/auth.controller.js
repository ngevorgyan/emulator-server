import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utiles/generateToken.js";

export const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    const admin = await UserModel.findOne({ isAdmin: true });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      res.json({
        _id: admin._id,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.log("loginAdmin", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginTrainee = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const user = await UserModel.findOne({ isAdmin: false, userName }).populate(
      {
        path: "bots",
        populate: {
          path: "level",
        },
      }
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user._id);

      res.json({
        token,
        haveFullName: !!user.fullName,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.log("loginTrainee", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkMe = (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log("checkMe", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
