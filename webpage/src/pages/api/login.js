// pages/api/login.js
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: "Login successful", role: user.role });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
