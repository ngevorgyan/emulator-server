import { model, Schema } from "mongoose";

const adminInfoSchema = new Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
});

const AdminInfoModel = model("AdminInfo", adminInfoSchema);

export default AdminInfoModel;
