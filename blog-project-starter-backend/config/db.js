const mysql = require("mysql2");
require('dotenv').config();

// 1. Create the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Add this line
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Test the connection immediately on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed! Check your Security Group or IP.');
        console.error('Error Details:', err.message);
    } else {
        console.log('✅ AWS RDS MySQL Connected successfully via Pool');
        connection.release(); // Always release the connection back to the pool
    }
});

// 3. Export the Promise-based version for use with async/await
const db = pool.promise();

module.exports = db;