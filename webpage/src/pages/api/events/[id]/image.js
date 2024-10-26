// pages/api/events/[id]/image.js
import dbConnect from "../../../../lib/mongodb";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    const event = await Event.findById(id);
    if (!event || !event.image || !event.imageType) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.setHeader("Content-Type", event.imageType); // Set the MIME type
    res.send(event.image); // Send the binary data
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Failed to retrieve image" });
  }
}
