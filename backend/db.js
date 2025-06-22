const config = {
  user: 'flightuser', // or your SQL username
  password: 'flightpass123',
  server: 'localhost', // or try '.\\SQLEXPRESS' if you're using SQL Express
  database: 'FlightBookingDB',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = config;