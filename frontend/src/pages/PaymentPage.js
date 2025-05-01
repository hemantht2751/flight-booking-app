import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <p className="text-light">No booking data received.</p>;

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments', {
        bookingId: booking.BookingID,
        paymentAmount: booking.Price,
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid'
      });

      alert('✅ Payment successful!');
    } catch (error) {
      alert('❌ Payment failed.');
    }
  };

  return (
    <div className="container text-light mt-5">
      <h3>Payment Details</h3>
      <div className="card bg-dark text-white shadow p-3 my-4">
        <div className="card-body">
          <p><strong>Flight:</strong> {booking.Airline} ({booking.FlightNumber})</p>
          <p><strong>From:</strong> {booking.Origin}</p>
          <p><strong>To:</strong> {booking.Destination}</p>
          <p><strong>Amount:</strong> ₹{booking.Price}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
