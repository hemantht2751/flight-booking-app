const express = require('express');
const axios = require('axios');
const { checkCachedFlights, cacheFlights } = require('../controllers/cacheController');
const router = express.Router();

router.get('/', async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const cached = await checkCachedFlights(origin, destination);
    if (cached) return res.json(cached);

    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: origin,
        arr_iata: destination
      }
    });

    const flights = response.data.data;
    await cacheFlights(origin, destination, flights);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

module.exports = router;
