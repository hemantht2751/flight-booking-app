const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../db'); // This should export your SQL config

router.post('/', async (req, res) => {
  const {
    airline,
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    flightDate,
    status,
    price
  } = req.body;

  try {
    const pool = await sql.connect(db);

    const result = await pool.request()
      .input('Airline', sql.NVarChar(100), airline)
      .input('FlightNumber', sql.NVarChar(20), flightNumber)
      .input('Origin', sql.NVarChar(50), origin)
      .input('Destination', sql.NVarChar(50), destination)
      .input('DepartureTime', sql.DateTime, departureTime)
      .input('ArrivalTime', sql.DateTime, arrivalTime)
      .input('FlightDate', sql.Date, flightDate)
      .input('Status', sql.NVarChar(50), status)
      .input('Price', sql.Decimal(10, 2), price)
      .query(`
        INSERT INTO Bookings (Airline, FlightNumber, Origin, Destination, DepartureTime, ArrivalTime, FlightDate, Status, Price)
        OUTPUT INSERTED.*
        VALUES (@Airline, @FlightNumber, @Origin, @Destination, @DepartureTime, @ArrivalTime, @FlightDate, @Status, @Price)
      `);

    res.status(201).json(result.recordset[0]); // Send back inserted booking
  } catch (err) {
    console.error('❌ Booking Save Error:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

module.exports = router;
