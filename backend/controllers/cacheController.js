const { poolPromise } = require('../db');

const checkCachedFlights = async (origin, destination) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('Origin', origin)
    .input('Destination', destination)
    .query('SELECT * FROM FlightsCache WHERE OriginIATA = @Origin AND DestinationIATA = @Destination AND DATEDIFF(MINUTE, CachedAt, GETDATE()) < 60');
  return result.recordset.length > 0 ? JSON.parse(result.recordset[0].FlightData) : null;
};

const cacheFlights = async (origin, destination, flightData) => {
  const pool = await poolPromise;
  await pool.request()
    .input('Origin', origin)
    .input('Destination', destination)
    .input('FlightData', JSON.stringify(flightData))
    .input('CachedAt', new Date())
    .query('INSERT INTO FlightsCache (OriginIATA, DestinationIATA, FlightData, CachedAt) VALUES (@Origin, @Destination, @FlightData, @CachedAt)');
};

module.exports = { checkCachedFlights, cacheFlights };