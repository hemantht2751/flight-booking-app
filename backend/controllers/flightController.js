const axios = require('axios');

const getFlights = async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: origin,
        arr_iata: destination,
      },
    });
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flight data' });
  }
};

module.exports = { getFlights };
