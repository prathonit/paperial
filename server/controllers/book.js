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
        let params = [moment().format('YYYY/MM/DD'), moment().format('YYYY/MM/DD'), b_id];
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
    let sort = req.query.sort;
    let categ = req.query.categ;
    let selectAll = (categ === 'all') ? 1 : 0;

    try {
        let sql = 'SELECT book.*, COUNT(review.rating) as b_review_count, SUM(review.rating) as b_rating, \
                   NOT (SELECT COUNT(order.o_id) FROM `order` INNER JOIN borrow ON order.o_id = borrow.o_id \
                   WHERE order.o_state != 0 AND iss_date <= ? AND ret_date >= ?) as b_avail\
                   FROM book LEFT JOIN (SELECT b_id, o_id, r_id FROM borrow) B ON book.b_id = B.b_id  \
                   LEFT JOIN review ON B.r_id = review.r_id \
                   WHERE book.b_genre = ? OR ? = 1 \
                   GROUP BY book.b_id \
                   LIMIT ? OFFSET ?';
        let params = [moment().format('YYYY/MM/DD'), moment().format('YYYY/MM/DD'), categ, selectAll, count, offset];
        let bookList = await database.call(sql, params);
        let ratingMap = new Array(6);
        for (let i=0; i<=5; i++) {
            ratingMap[i] = [];
        }
        bookList.forEach(book =>  {
            book.b_img = `${config.HOST_URL}/static/${book.b_id}.png`;
            book.b_rating /= book.b_review_count;
            book.b_rating ||= 0;
            book.b_desc = book.b_desc.substr(0, 200);
            ratingMap[book.b_rating].push(book);
        });
        let outputResult = [];
        if (sort === 'rating_dec') {
            for (let i=5; i>=0; i--) {
                outputResult = outputResult.concat(ratingMap[i]);
            }
        } else {
            for (let i=0; i<=5; i++) {
                outputResult = outputResult.concat(ratingMap[i]);
            }
        }
        response.success(res, outputResult);
    } catch (e) {
        return next(e);
    }
};