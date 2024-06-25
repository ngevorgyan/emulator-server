import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import passGenerator from "../utiles/passGenerator.js";
import sendInfo from "../utiles/telegramMessanger.js";

async function seedAdmin() {
  try {
    const existingAdmin = await UserModel.findOne({ isAdmin: true });

    if (!existingAdmin) {
      const newP = passGenerator();
      const adminCredentials = {
        userName: "admin",
        password: newP,
        isAdmin: true,
      };

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
      adminCredentials.password = hashedPassword;

      await UserModel.create(adminCredentials);
      await sendInfo(`Создан админ: \n Логин: admin\n парол: ${newP}`);

      console.log("Admin user created successfully!!! \n -------------------");
    } else {
      console.log("Admin user already exist!!! \n -------------------");
    }
  } catch (err) {
    console.log("Eror seedAdmin", err.message);
  }
}

export default seedAdmin;
