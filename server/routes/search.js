const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const bookController = reqlib('/controllers/book.js');
const response = reqlib('/utils/response').response;
const magic = reqlib('./utils/magic.js');

router.get('/search',)