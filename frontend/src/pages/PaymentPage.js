import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentPage() {
  const { state } = useLocation();
  const flight = state?.flight;

  if (!flight) return <p>No flight data received for payment.</p>;

  const handlePayment = () => {
    alert('✅ Payment successful and booking confirmed!');
  };

  return (
    <div className="container text-light mt-5">
      <h3>Payment Details</h3>
      <div className="card bg-dark text-white shadow p-3 my-4">
        <div className="card-body">
          <p><strong>Flight:</strong> {flight.airline?.name} ({flight.flight?.iata})</p>
          <p><strong>From:</strong> {flight.departure?.airport}</p>
          <p><strong>To:</strong> {flight.arrival?.airport}</p>
          <p><strong>Amount:</strong> ₹{Math.floor(Math.random() * 5000) + 3000}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
