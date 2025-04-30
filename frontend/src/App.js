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
  const navigate = useNavigate();

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
            <div className="container py-5">
              <FlightSearch onSearch={setFlights} />
              <div className="row mt-4">
                {flights.length === 0 ? (
                  <p className="text-light text-center">No results yet.</p>
                ) : (
                  flights.map((flight, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 text-white">
                        <div className="card-body">
                          <h5 className="card-title">
                            ✈️ {flight.airline?.name || 'Unknown Airline'} ({flight.flight?.iata || flight.flight?.number || 'N/A'})
                          </h5>
                          <p className="card-text">
                            <strong>{flight.departure?.airport || 'Unknown Departure'}</strong> →
                            <strong> {flight.arrival?.airport || 'Unknown Arrival'}</strong>
                          </p>
                          <p className="card-text">
                            🕑 <strong>Departure:</strong>{' '}
                            {flight.departure?.scheduled
                              ? new Date(flight.departure.scheduled).toLocaleTimeString()
                              : 'N/A'}
                            <br />
                            🕓 <strong>Arrival:</strong>{' '}
                            {flight.arrival?.scheduled
                              ? new Date(flight.arrival.scheduled).toLocaleTimeString()
                              : 'N/A'}
                          </p>
                          <p className="card-text">
                            📅 <strong>Date:</strong> {flight.flight_date}
                            <br />
                            📊 <strong>Status:</strong> {flight.flight_status}
                          </p>
                          <p className="card-text">
                            💵 <strong>Estimated Price:</strong> ₹{Math.floor(Math.random() * 5000) + 3000}
                          </p>
                        </div>

                        <div className="card-footer d-flex justify-content-between">
                          <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handleTrackFlight(flight.flight?.iata)}
                          >
                            📡 Track Flight
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => navigate('/confirmation', { state: { flight } })}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
