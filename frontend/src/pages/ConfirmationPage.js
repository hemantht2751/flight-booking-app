import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmationPage() {
  const { state } = useLocation();
  const flight = state?.flight;
  const navigate = useNavigate();

  if (!flight) return <p className="text-light">No flight selected.</p>;

  const price = Math.floor(Math.random() * 5000) + 3000;

  const handleConfirm = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        airline: flight.airline?.name,
        flightNumber: flight.flight?.iata || flight.flight?.number,
        origin: flight.departure?.iata,
        destination: flight.arrival?.iata,
        departureTime: flight.departure?.scheduled,
        arrivalTime: flight.arrival?.scheduled,
        flightDate: flight.flight_date,
        status: flight.flight_status,
        price: price
      });

      const booking = res.data;
      navigate('/payment', { state: { booking } });
    } catch (error) {
      alert('❌ Could not confirm booking.');
      console.error(error);
    }
  };

  return (
    <div className="container text-light mt-5">
      <h3>Confirm Your Booking</h3>
      <div className="card bg-dark text-white shadow p-3 my-4">
        <div className="card-body">
          <h5>{flight.airline?.name} ({flight.flight?.iata})</h5>
          <p>{flight.departure?.airport} → {flight.arrival?.airport}</p>
          <p>Date: {flight.flight_date}</p>
          <p>Status: {flight.flight_status}</p>
          <p>💵 Estimated Price: ₹{price}</p>
        </div>
      </div>
      <button className="btn btn-success" onClick={handleConfirm}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default ConfirmationPage;
