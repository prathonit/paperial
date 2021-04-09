const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const bookController = reqlib('/controllers/book.js');

// get info for a particular book
router.get('/details', validateRequest('book', ['b_id'], 'get'), bookController.book_fetch_details_by_id);

// get the feed/catalog of books
router.get('/catalog', validateRequest('book', ['offset', 'count'], 'get'), bookController.book_fetch_catalog);

module.exports = router;