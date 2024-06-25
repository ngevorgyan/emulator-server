import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, require: false },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    fullName: { type: String, require: false },
    token: { type: String, require: false },
    bots: [{ type: Schema.Types.ObjectId, ref: "Bot" }],
    test: [{ type: Schema.Types.ObjectId, ref: "TestAnswer" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
