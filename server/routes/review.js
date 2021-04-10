const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const reviewController = reqlib('/controllers/review.js');

router.get('/feed', validateRequest('review', ['b_id', 'offset', 'count'], 'get'), reviewController.review_fetch_by_b_id);

router.post('/post', validateRequest('review', ['o_id', 'review', 'rating'], 'post'), reviewController.review_add);

module.exports = router;