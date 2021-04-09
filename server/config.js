const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});

const config = {
	PROJECT_ROOT: __dirname,
	HOST_URL: process.env.HOST_URL,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	JWT_SECRET: process.env.JWT_SECRET,
	PRODUCTION: (process.env.env == 'development') ? 0 : 1,
	MAIL_USER: process.env.MAIL_USER,
	MAIL_PASSWORD: process.env.MAIL_PASSWORD
};

module.exports = config;