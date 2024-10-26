// pages/api/events/create.js
import dbConnect from "../../../lib/mongodb";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { name, description, imageUrl } = req.body;

    try {
      const newEvent = await Event.create({ name, description, imageUrl });
      res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
