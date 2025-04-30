import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings?userId=1')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h3>My Booking History</h3>
      <ul className="list-group">
        {bookings.map((booking, index) => (
          <li key={index} className="list-group-item">
            Booking #{booking.BookingID} for Flight #{booking.FlightID} on {new Date(booking.BookingDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingHistory;