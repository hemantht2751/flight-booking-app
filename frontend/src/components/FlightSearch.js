import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch({ onSearch, onSort }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!origin || !destination || !flightDate) {
      setError('Please enter origin, destination, and date.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/flights?origin=${origin}&destination=${destination}&date=${flightDate}`
      );

      const flights = Array.isArray(response.data.data)
        ? response.data.data
        : response.data;

      const flightsWithDate = flights.map(f => ({
        ...f,
        flight_date: flightDate,
        price: Math.floor(Math.random() * 5000) + 3000
      }));

      onSearch(flightsWithDate);
    } catch (err) {
      console.error('❌ Error fetching flights:', err);
      setError('Flight search failed. Try valid inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-white">Search Flights</h2>

      <input
        className="form-control mb-2"
        placeholder="Origin (e.g. DEL)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
      />
      <input
        className="form-control mb-2"
        placeholder="Destination (e.g. BOM)"
        value={destination}
        onChange={(e) => setDestination(e.target.value.toUpperCase())}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={flightDate}
        onChange={(e) => setFlightDate(e.target.value)}
      />

      <select className="form-select mb-3" onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="price">Price (Low to High)</option>
        <option value="time">Departure Time</option>
      </select>

      <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default FlightSearch;
