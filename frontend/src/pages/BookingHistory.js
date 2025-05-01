import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => alert('❌ Failed to fetch booking history'));
  }, []);

  return (
    <div className="container text-light mt-5">
      <h3>Your Booking History</h3>
      <div className="row mt-3">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.BookingID} className="card bg-dark text-white mb-3 shadow-sm p-3">
              <h5>{b.Airline} ({b.FlightNumber})</h5>
              <p>{b.Origin} → {b.Destination}</p>
              <p>Date: {new Date(b.FlightDate).toDateString()}</p>
              <p>Status: {b.Status}</p>
              <p>Price: ₹{b.Price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
