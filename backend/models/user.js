import mongoose from "mongoose";
import { user } from "pg/lib/defaults";

const USER_ROLES = ["user", "admin", "moderator"];

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: USER_ROLES },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
