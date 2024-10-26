// pages/api/signup.js
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const { name, email, password, rollNo, year, gender, branch } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        rollNo,
        year,
        gender,
        branch,
        role: 0, // Set default role as 0 (student)
      });

      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error("Error saving user:", error); // Add error logging
      res.status(400).json({ message: "Error creating user", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
