// pages/api/events/index.js
import dbConnect from "../../../lib/mongodb";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    try {
      const events = await Event.find({});
      res.status(200).json({ events });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
