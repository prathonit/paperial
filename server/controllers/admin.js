const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const moment = require('moment');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const createError = require('http-errors');

module.exports.admin_get_books = async (req, res, next) => {
    let a_id = req.query.a_id;
    let count = parseInt(req.query.count);
    let offset = parseInt(req.query.offset);

    let sql = 'SELECT book.*, \
               NOT (SELECT COUNT(order.o_id) FROM `order` INNER JOIN borrow ON order.o_id = borrow.o_id \
               WHERE order.o_state != 0 AND iss_date <= ? AND ret_date >= ?) as b_avail \
               FROM book INNER JOIN admin ON admin.a_perm = book.b_genre AND admin.a_id = ? \
               LIMIT ? OFFSET ?';
    let params = [moment().format('YYYY/MM/DD'), moment().format('YYYY/MM/DD'), a_id, count, offset];
    try {
        let booksResult = await database.call(sql, params);
        booksResult.forEach(book =>  {
            book.b_img = `${config.HOST_URL}/static/${book.b_id}.png`;
        });
        response.success(res, booksResult);
    } catch (e) {
        return next(e);
    }
};

module.exports.admin_get_orders = async (req, res, next) => {
    let a_id = req.query.a_id;
    let count = parseInt(req.query.count);
    let offset = parseInt(req.query.offset);

    let sql = 'SELECT O.*, track.*, book.b_name, book.b_author, book.b_genre FROM `order` O \
               INNER JOIN track ON track.o_id = O.o_id \
               AND track.a_id = ? INNER JOIN book ON track.b_id = book.b_id \
               LIMIT ? OFFSET ?';
    let params = [a_id, count, offset];

    try {
        let orderResult = await database.call(sql, params);
        orderResult.forEach(order=>  {
            order.b_img = `${config.HOST_URL}/static/${order.b_id}.png`;
        });
        response.success(res, orderResult);
    } catch (e) {
        return next(e);
    }
};

module.exports.admin_get_users = async (req, res, next) => {
    let count = parseInt(req.query.count);
    let offset = parseInt(req.query.offset);

    let sql = 'SELECT user.* FROM user LIMIT ? OFFSET ?';
    let params = [count, offset];
    try {
        let userResult = await database.call(sql, params);
        userResult.forEach(user => {
            user.u_img = `${config.HOST_URL}/static/user_default.png`;
        });
        response.success(res, userResult);
    } catch (e) {
        return next(e);
    }
};