const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:flightNumber', async (req, res) => {
  const { flightNumber } = req.params;

  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        flight_iata: flightNumber
      }
    });

    const flightData = response.data.data[0];
    res.json({ status: flightData.flight_status, departure: flightData.departure, arrival: flightData.arrival });
  } catch (err) {
    res.status(500).json({ error: 'Flight status lookup failed' });
  }
});

module.exports = router;
