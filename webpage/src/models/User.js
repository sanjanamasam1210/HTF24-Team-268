// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rollNo: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
  branch: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
