const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
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