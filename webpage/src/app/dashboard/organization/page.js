// src/app/dashboard/organization/page.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrganizationDashboard() {
  const [showForm, setShowForm] = useState(false); // Controls the form visibility
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Controls the selected event for the modal

  // Fetch existing events from the database when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events);
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      setEvents((prevEvents) => [...prevEvents, data.event]); // Add new event to events list
      setFormData({ name: "", description: "", imageUrl: "" }); // Clear the form
      setShowForm(false); // Hide the form after submission
    } else {
      console.error("Failed to create event:", data.message);
    }
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  const takeAttendance = async () => {
    if (!selectedEvent) return;

    try {
      const res = await axios.post("/api/takeAttendance");
      if (res.status === 200) {
        alert("Attendance taken successfully!");
      } else {
        alert("Failed to take attendance.");
      }
    } catch (error) {
      console.error("Error taking attendance:", error);
      alert("Error taking attendance. Check the console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Organization Dashboard</h1>

      {/* Button to Toggle Event Creation Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "Create Event"}
      </button>

      {/* Event Creation Form (Visible Only When showForm is True) */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4">
          <h2 className="text-xl font-bold">Create an Event</h2>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className="submit-button">Create Event</button>
        </form>
      )}

      {/* Display Events as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => openEventModal(event)}
          >
            <h3 className="text-xl text-gray-800 font-bold">{event.name}</h3>
            <p className="text-gray-700">{event.description}</p>
            {event.imageUrl && (
              <img src={event.imageUrl} alt={event.name} className="mt-2 rounded-md w-full h-40 object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-2xl text-gray-800 font-bold">{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            {selectedEvent.imageUrl && (
              <img src={selectedEvent.imageUrl} alt={selectedEvent.name} className="mt-2 rounded-md w-full h-60 object-cover" />
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={takeAttendance}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Take Attendance
              </button>
              <button
                onClick={closeEventModal}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
