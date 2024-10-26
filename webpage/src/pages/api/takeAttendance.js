// pages/api/takeAttendance.js
import { spawn } from "child_process";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const process = spawn("python", ["ML/test.py"], { detached: true, stdio: "ignore" });

    process.on("error", (error) => {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ message: "Error taking attendance" });
    });

    // Send response immediately after starting the process
    res.status(200).json({ message: "Attendance process started successfully" });

    // Detach and unreference the process so it runs independently
    process.unref();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
