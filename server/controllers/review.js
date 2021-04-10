const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const moment = require('moment');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const createError = require('http-errors');

module.exports.review_fetch_by_b_id = async (req, res, next) => {
    let b_id = req.query.b_id;
    let count = parseInt(req.query.count);
    let offset = parseInt(req.query.offset);

    let sql = 'SELECT review.*, borrow.u_id FROM review \
               INNER JOIN borrow ON borrow.r_id = review.r_id \
               INNER JOIN book ON borrow.b_id = book.b_id \
               WHERE book.b_id = ? \
               LIMIT ? OFFSET ?';
    let params = [b_id, count, offset];
    try {
        let reviews = await database.call(sql, params);
        response.success(res, reviews);
    } catch (e) {
        return next(e);
    } 
};

module.exports.review_add = async (req, res, next) => {
    let o_id = req.body.o_id;
    let rating = req.body.rating;
    let review = req.body.review;

    try {
        let sql = 'INSERT INTO review SET ?';
        let params = [{
            rating: rating,
            review: review,
            timestamp: moment().unix()
        }];
        let reviewResult = await database.call(sql, params);
        sql = 'UPDATE borrow SET r_id = ? WHERE o_id = ?';
        params = [reviewResult.insertId, o_id];
        await database.call(sql, params);
        response.created(res, {}, 'Review posted successfully');
    } catch (e) {
        return next(e);
    }
};