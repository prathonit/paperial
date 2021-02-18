const config = require('app-root-path').resolve('/config.js');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    multipleStatements: true
});

module.exports = pool;