const { poolPromise } = require('../db/db');

const createBooking = async (req, res) => {
  const { userId, flightId, bookingDate } = req.body;
  try {
    const pool = await poolPromise;
    const insertResult = await pool.request()
      .input('UserID', userId)
      .input('FlightID', flightId)
      .input('BookingDate', bookingDate)
      .query('INSERT INTO Bookings (UserID, FlightID, BookingDate) OUTPUT INSERTED.BookingID VALUES (@UserID, @FlightID, @BookingDate)');

    const bookingId = insertResult.recordset[0].BookingID;
    const amount = Math.floor(Math.random() * 5000) + 3000; // Simulated price
    res.status(201).json({ bookingId, amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed' });
  }
};

const getBookings = async (req, res) => {
  const { userId } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserID', userId)
      .query('SELECT * FROM Bookings WHERE UserID = @UserID');

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};

module.exports = { createBooking, getBookings };