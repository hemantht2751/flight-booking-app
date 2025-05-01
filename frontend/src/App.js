import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FlightSearch from './components/FlightSearch';
import PaymentPage from './pages/PaymentPage';
import BookingHistory from './pages/BookingHistory';
import ConfirmationPage from './pages/ConfirmationPage';
import './index.css';

function AppWrapper() {
  const [flights, setFlights] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const handleSort = (type) => {
    let sorted = [...flights];
    if (type === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === 'time') {
      sorted.sort((a, b) => new Date(a.departure?.scheduled) - new Date(b.departure?.scheduled));
    }
    setFlights(sorted);
  };

  const handleTrackFlight = async (flightNumber) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/flight-status/${flightNumber}`);
      const data = res.data;

      alert(`✈️ Flight Status: ${data.status}
Terminal: ${data.terminal || 'N/A'}
Gate: ${data.gate || 'N/A'}
Scheduled Departure: ${data.departureTime || 'N/A'}
Scheduled Arrival: ${data.arrivalTime || 'N/A'}`);
    } catch (error) {
      alert('❌ Could not fetch flight status.');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🛫 Flight Booker</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/payment">Payment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">Booking History</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container py-4">
              <FlightSearch onSearch={setFlights} onSort={handleSort} />

              <div className="scroll-container mt-4">
                {flights.slice(0, visibleCount).map((flight, index) => (
                  <div key={index} className="card text-white bg-dark p-3 mx-2 shadow" style={{ minWidth: '320px' }}>
                    <h5>{flight.airline?.name} ({flight.flight?.iata})</h5>
                    <p>{flight.departure?.airport} → {flight.arrival?.airport}</p>
                    <p>Date: {flight.flight_date}</p>
                    <p>Departs: {new Date(flight.departure?.scheduled).toLocaleTimeString()}</p>
                    <p>Price: ₹{flight.price}</p>
                    <div className="d-flex justify-content-between mt-2">
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => handleTrackFlight(flight.flight?.iata)}
                      >
                        📡 Track
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate('/confirmation', { state: { flight } })}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < flights.length && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setVisibleCount(visibleCount + 5)}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
