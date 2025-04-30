const sql = require('mssql');

const config = {
  user: 'flightuser',
  password: 'flightpass123',
  server: 'localhost',
  database: 'FlightBookingDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.log('❌ DB Connection Failed!', err);
  });

module.exports = { sql, poolPromise };
