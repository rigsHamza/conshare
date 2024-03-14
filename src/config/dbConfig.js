const mysql = require('mysql');
require('dotenv').config();


const pool = mysql.createPool({
    connectionLimit: 10, // adjust the limit as per your requirement
    connectTimeout: 60*60*1000,
    acquireTimeout:60*60*1000,
    timeout:60*60*1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Attempt to acquire a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    
    // Release the connection after using it
    connection.release();
});

// Event listener for errors in the pool
pool.on('error', (err) => {
    console.error('MySQL database pool error:', err);
});

module.exports = pool;
