const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const moment = require('moment');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const createError = require('http-errors');

module.exports.book_fetch_details_by_id = async (req, res, next) => {
    let b_id = req.query.b_id;

    try {
        let sql = 'SELECT book.*, COUNT(review.rating) as b_review_count, SUM(review.rating) as b_rating, \
                   NOT (SELECT COUNT(order.o_id) FROM `order` INNER JOIN borrow ON order.o_id = borrow.o_id \
                   WHERE order.o_state != 0 AND iss_date <= ? AND ret_date >= ?) as b_avail\
                   FROM book LEFT JOIN borrow ON book.b_id = borrow.b_id \
                   INNER JOIN review ON borrow.r_id = review.r_id \
                   WHERE book.b_id = ?';
        let params = [moment().unix(), moment().unix(), b_id];
        let bookDetails = await database.call(sql, params);
        bookDetails.forEach(book =>  {
            book.b_img = `${config.HOST_URL}/static/${book.b_id}.png`;
            book.b_rating /= book.b_review_count;
        });
        if (bookDetails.length) {
            response.success(res, bookDetails[0]);
        } else {
            response.notFound(res, {}, 'Book not found', true);
        }
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

module.exports.book_fetch_catalog = async (req, res, next) => {
    let offset = parseInt(req.query.offset);
    let count = parseInt(req.query.count);

    try {
        let sql = 'SELECT book.*, COUNT(review.rating) as b_review_count, SUM(review.rating) as b_rating, \
                   NOT (SELECT COUNT(order.o_id) FROM `order` INNER JOIN borrow ON order.o_id = borrow.o_id \
                   WHERE order.o_state != 0 AND iss_date <= ? AND ret_date >= ?) as b_avail\
                   FROM book LEFT JOIN borrow ON book.b_id = borrow.b_id  \
                   LEFT JOIN review ON borrow.r_id = review.r_id \
                   GROUP BY borrow.b_id \
                   LIMIT ? OFFSET ?';
        let params = [moment().unix(), moment().unix(), count, offset];
        let bookList = await database.call(sql, params);
        bookList.forEach(book =>  {
            book.b_img = `${config.HOST_URL}/static/${book.b_id}.png`;
            book.b_rating /= book.b_review_count;
            book.b_desc = book.b_desc.substr(0, 200);
        });
        response.success(res, bookList);
    } catch (e) {
        return next(e);
    }
};


