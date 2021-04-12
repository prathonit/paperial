const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const bookController = reqlib('/controllers/book.js');
const response = reqlib('/utils/response').response;
const magic = reqlib('./utils/magic.js');

// get info for a particular book
router.get('/details', validateRequest('book', ['b_id'], 'get'), bookController.book_fetch_details_by_id);

// get the feed/catalog of books
router.get('/catalog', validateRequest('book', ['offset', 'count', 'categ', 'sort'], 'get'), bookController.book_fetch_catalog);

router.get('/magic', validateRequest('book', ['u_id'], 'get'), async (req, res, next) => {
    try {
        let result = await magic(req.query.u_id);
        response.success(res, result);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;