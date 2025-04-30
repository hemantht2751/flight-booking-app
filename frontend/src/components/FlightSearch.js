import React, { useState } from 'react';
import axios from 'axios';

function FlightSearch({ onSearch }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination IATA codes.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/flights?origin=${origin}&destination=${destination}`
      );

      console.log('🚀 Flights response:', response.data);

      // Most APIs return results inside `data.data`
      if (response.data && Array.isArray(response.data.data)) {
        onSearch(response.data.data);
      } else if (Array.isArray(response.data)) {
        onSearch(response.data); // Fallback for custom API
      } else {
        onSearch([]); // No valid data
      }
    } catch (err) {
      console.error('❌ Error fetching flights:', err);
      setError('Flight search failed. Please try valid IATA codes like DEL, BOM.');
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
        className="form-control mb-3"
        placeholder="Destination (e.g. BOM)"
        value={destination}
        onChange={(e) => setDestination(e.target.value.toUpperCase())}
      />

      <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default FlightSearch;
