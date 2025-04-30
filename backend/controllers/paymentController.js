const { poolPromise } = require('../db/db');

const processPayment = async (req, res) => {
  const { bookingId, amount, paymentReference } = req.body;
  try {
    const pool = await poolPromise;
    const existing = await pool.request()
      .input('Reference', paymentReference)
      .query('SELECT * FROM Payments WHERE PaymentReference = @Reference');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: 'Duplicate payment detected' });
    }

    await pool.request()
      .input('BookingID', bookingId)
      .input('Amount', amount)
      .input('PaymentReference', paymentReference)
      .query('INSERT INTO Payments (BookingID, Amount, PaymentReference) VALUES (@BookingID, @Amount, @PaymentReference)');

    res.json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ error: 'Payment failed' });
  }
};

module.exports = { processPayment };