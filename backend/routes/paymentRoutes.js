const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../db'); // your SQL connection config

router.post('/', async (req, res) => {
  const { bookingId, paymentAmount, paymentMethod, paymentStatus } = req.body;

  try {
    const pool = await sql.connect(db);

    await pool.request()
      .input('BookingID', sql.Int, bookingId)
      .input('PaymentAmount', sql.Decimal(10, 2), paymentAmount)
      .input('PaymentMethod', sql.NVarChar(50), paymentMethod)
      .input('PaymentStatus', sql.NVarChar(50), paymentStatus)
      .query(`
        INSERT INTO Payments (BookingID, PaymentAmount, PaymentMethod, PaymentStatus)
        VALUES (@BookingID, @PaymentAmount, @PaymentMethod, @PaymentStatus)
      `);

    res.status(201).json({ message: '✅ Payment saved successfully' });
  } catch (err) {
    console.error('❌ Payment Save Error:', err);
    res.status(500).json({ error: 'Failed to save payment' });
  }
});

module.exports = router;
