import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./admin.css"

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showSuccessMessage = (message) => {
    setShowSuccessPopup(message);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await axios.put(`http://localhost:3000/api/events/${editingEvent._id}`, formData);
        showSuccessMessage("Event updated successfully!");
        setEditingEvent(null);
      } else {
        await axios.post('http://localhost:3000/api/events', formData);
        showSuccessMessage("Event created successfully!");
      }
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: ''
      });
      fetchEvents();
    } catch (error) {
      console.error('Error submitting event:', error);
      setError('Failed to submit event. Please try again.');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
  };

  const handleDelete = (id) => {
    setConfirmationAction(() => async () => {
      try {
        await axios.delete(`http://localhost:3000/api/events/${id}`);
        fetchEvents();
        setShowConfirmation(false);
        showSuccessMessage("Event deleted successfully!");
      } catch (error) {
        console.error('Error deleting event:', error);
        setError('Failed to delete event. Please try again.');
      }
    });
    setShowConfirmation(true);
  };

  return (
    <div className="App">
      <h1>Event Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
      </form>

      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Start: {new Date(event.startDate).toLocaleDateString()}</p>
            <p>End: {new Date(event.endDate).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </div>
        ))
      )}

      {showConfirmation && (
        <div>
          <div className="overlay" onClick={() => setShowConfirmation(false)}></div>
          <div className="confirmation-popup">
            <h3>Are you sure you want to delete this event?</h3>
            <button onClick={confirmationAction}>Confirm</button>
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showSuccessPopup && <div className="success-popup">{showSuccessPopup}</div>}
    </div>
  );
}

export default App;