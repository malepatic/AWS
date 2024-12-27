import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/user/my-events", {
          method: 'GET',
          headers: {
            'token': `${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch registered events');
        }
        const data = await response.json();
        setMyEvents(data.events);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchMyEvents();
  }, [authToken]);

  const handleDeregister = async (eventId) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/deregister-event", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `${authToken}`,
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to deregister');
      }

      const data = await response.json();
      alert(data.message);
      setMyEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Events</h1>
      {myEvents.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <ul>
          {myEvents.map((event) => (
            <li key={event._id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <button onClick={() => handleDeregister(event._id)}>
                Deregister
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEvents;
