const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const reqlib = require('app-root-path').require;
const handler = reqlib('utils/response').handler;
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json({
	limit: '50mb'
}));
app.use(
	express.urlencoded({
		extended: false,
		limit: '50mb',
	})
);
app.use(cors());

app.use('/static', express.static(__dirname + '/local'));
app.use('/', require('./routes/index.js'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	console.log(err);
	handler(res, err);
	
});

module.exports = app;