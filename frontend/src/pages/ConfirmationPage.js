import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const { state } = useLocation();
  const flight = state?.flight;
  const navigate = useNavigate();

  if (!flight) return <p>No flight selected.</p>;

  const handleConfirm = () => {
    navigate('/payment', { state: { flight } });
  };

  return (
    <div className="container text-light mt-5">
      <h3>Confirm Your Booking</h3>
      <div className="card text-white bg-gradient shadow p-3 my-4">
        <div className="card-body">
          <h5>{flight.airline?.name} ({flight.flight?.iata})</h5>
          <p>{flight.departure?.airport} → {flight.arrival?.airport}</p>
          <p>Date: {flight.flight_date}</p>
          <p>Status: {flight.flight_status}</p>
          <p>
            💵 Estimated Price: ₹{Math.floor(Math.random() * 5000) + 3000}
          </p>
        </div>
      </div>
      <button className="btn btn-success" onClick={handleConfirm}>Proceed to Payment</button>
    </div>
  );
}

export default ConfirmationPage;
