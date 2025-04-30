import React from 'react';
import { useNavigate } from 'react-router-dom';

function FlightResults({ flights }) {
  const navigate = useNavigate();

  const handleBookNow = (flight) => {
    navigate('/confirmation', { state: { flight } });
  };

  return (
    <div className="row mt-4">
      {flights.length === 0 ? (
        <p className="text-white">No results found</p>
      ) : (
        flights.map((flight, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card bg-dark text-white h-100 shadow-lg">
              <div className="card-body">
                <h5 className="card-title">{flight.airline?.name || 'Unknown Airline'}</h5>
                <p className="card-text">
                  ✈️ {flight.departure?.airport || 'Unknown'} → {flight.arrival?.airport || 'Unknown'}<br/>
                  Flight: {flight.flight?.iata || 'N/A'}<br/>
                  Departure: {flight.departure?.scheduled?.substring(0, 16) || 'N/A'}<br/>
                  Arrival: {flight.arrival?.scheduled?.substring(0, 16) || 'N/A'}<br/>
                  Price: ₹{Math.floor(Math.random() * 5000) + 3000}
                </p>
                <button className="btn btn-outline-warning" onClick={() => handleBookNow(flight)}>Book Now</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FlightResults;