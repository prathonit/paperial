const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const moment = require('moment');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const createError = require('http-errors');

module.exports.order_place_order = async (req, res, next) => {
    let u_id = req.body.u_id;
    let b_id = req.body.b_id;
    let from = req.body.from;
    let to = req.body.to;
    try {
        if (!moment(from).isValid() || !moment(to).isValid()) {
            throw createError(400, 'Invalid date format');
        }
        if (from < moment().format('YYYY/MM/DD') || to < moment().format('YYYY/MM/DD')) {
            throw createError(400, 'Invalid date, from or to cannot be in the past');
        }
        if (from > to) {
            throw createError(400, 'From cannot be greater than to');
        }
        let sql = '', params = [];
        sql = 'SELECT NOT COUNT(order.o_id) as isValid FROM `order` \
                   INNER JOIN borrow ON order.o_id = borrow.o_id AND borrow.b_id = ? \
                   WHERE ? <= order.ret_date AND ? >= order.iss_date AND order.o_state != 0';
        params = [b_id, from, to];
        let result = await database.call(sql, params);
        let isValid = result[0].isValid;
        if (!isValid) {
            throw createError(400, 'Book not available in this period');
        }
        sql = 'SELECT COUNT(O.o_id) as order_count FROM `order` O \
                   INNER JOIN borrow ON O.o_id = borrow.o_id AND borrow.u_id = ? \
                   WHERE O.o_state != 0';
        params = [u_id];
        let orderCountResult = await database.call(sql, params);
        if (orderCountResult[0].order_count > 2) {
            throw createError(400, 'Cannot have more that two active orders');
        }
        sql = 'INSERT INTO `order` SET ?';
        params = [{
            iss_date: from,
            ret_date: to,
            o_state: 1
        }];
        let orderResult = await database.call(sql, params);
        sql = 'SELECT admin.a_id FROM admin INNER JOIN book ON book.b_genre = admin.a_perm AND book.b_id = ?';
        params = [b_id];
        let adminResult = await database.call(sql, params);
        sql = 'INSERT INTO borrow SET ?; INSERT INTO track SET ?';
        params = [
            {o_id: orderResult.insertId, b_id: b_id, u_id: u_id}, 
            {a_id: adminResult[0].a_id, b_id: b_id, o_id: orderResult.insertId, u_id: u_id}
        ];
        await database.call(sql, params);
        response.created(res, {}, 'Order placed successfully');
    } catch (e) {
        return next(e);
    }
};

module.exports.order_get_future_orders = async (req, res, next) => {
    let b_id = req.query.b_id;

    try {
        let sql = 'SELECT iss_date, ret_date FROM `order` INNER JOIN \
                   borrow ON order.o_id = borrow.o_id \
                   WHERE order.iss_date >= ? AND order.o_state != 0 AND borrow.b_id = ?';
        let params = [moment().format('YYYY/MM/DD'), b_id];
        let result = await database.call(sql, params);
        response.success(res, result);
    } catch (e) {
        return next(e);
    } 
};

module.exports.order_get_orders_by_u_id = async (req, res, next) => {
    let u_id = req.query.u_id;
    let offset = parseInt(req.query.offset);
    let count = parseInt(req.query.count);

    try {
        let sql = 'SELECT book.*, O.* FROM `order` as O INNER JOIN \
                   borrow ON O.o_id = borrow.o_id \
                   INNER JOIN book ON book.b_id = borrow.b_id \
                   WHERE borrow.u_id = ? \
                   LIMIT ? OFFSET ?';
        let params = [u_id, count, offset];
        let result = await database.call(sql, params);
        result.forEach(book => {
            book.b_img = `${config.HOST_URL}/static/${book.b_id}.png`;
        });
        response.success(res, result);
    } catch (e) {
        return next(e);
    }
};

module.exports.order_get_all_orders = async () => {
    let sql = 'SELECT borrow.b_id, borrow.u_id FROM borrow ORDER BY borrow.b_id';
    let params = [];
    let result = await database.call(sql, params);
    return result;
};

module.exports.order_get_leader_board = async (req, res, next) => {
    let sql = 'SELECT user.u_id, user.u_name,COUNT(O.o_id) as booksRead FROM `order` O \
               INNER JOIN borrow ON borrow.o_id = O.o_id \
               INNER JOIN user ON borrow.u_id = user.u_id \
               WHERE (O.iss_date BETWEEN ? AND ?) OR (O.ret_date BETWEEN ? AND ?) \
               GROUP BY (user.u_id) ORDER BY booksRead DESC LIMIT 10 OFFSET 0';
    let params = [moment().subtract(7,'d').format('YYYY/MM/DD'), moment().format('YYYY/MM/DD'), moment().subtract(7,'d').format('YYYY/MM/DD'), moment().format('YYYY/MM/DD')];
    try {
        let result = await database.call(sql, params);
        result.forEach(user => {
            user.u_img = `${config.HOST_URL}/static/user_default.png`;
        });
        response.success(res, result);
    } catch (e) {
        return next(e);
    }
};