import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        console.log(response)
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

//   useEffect(() => {
//     async function fetchUserEvents() {
//       try {
//         const response = await fetch("http://localhost:3000/api/user/my-events", {
//           method: 'GET',
//           headers: {
//             'token': `${authToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user events');
//         }

//         const data = await response.json();
//         setUserEvents(data.events.map((event) => event._id));
//       } catch (error) {
//         setError(error.message);
//       }
//     }

//     fetchUserEvents();
//   }, [authToken]);

  const handleRegisterEvent = async (eventId) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/register-event", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': `${authToken}`,
        },
        body: JSON.stringify({ id: eventId }),
      });

      const data = await response.json();
      alert(data.message);
      setUserEvents((prev) => [...prev, eventId]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Available Events</h1>
      <Link to="/user/my-events">Go to My Events</Link>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
              <button onClick={() => handleRegisterEvent(event._id)}>
                Register
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookEvent;
