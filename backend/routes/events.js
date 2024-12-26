const express = require('express');
const router = express.Router();
const Event = require('../models/user');

// POST route to create an event
router.post('/', async (req, res) => {
  try {
    const { title, description, startDate, endDate, location } = req.body;

    if (!title || !description || !startDate || !endDate || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new event
    const newEvent = new Event({
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      location: location
    });

    // Save the event to the database
    await newEvent.save();

    // Send a success response
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE an event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  // Get event ID from the URL parameter

  try {
    const event = await Event.findByIdAndDelete(id);  // Find and delete the event

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// PUT (Update) an event by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;  // Get event ID from the URL parameter
  const { title, description, startDate, endDate, location } = req.body;  // Get new data from the request body

  try {
    // Update the event with the new data
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, startDate, endDate, location },
      { new: true, runValidators: true }  // Return the updated event and validate input
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
});

module.exports = router;  // Export the router