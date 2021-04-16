const appRoot = require('app-root-path');
const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const moment = require('moment');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const createError = require('http-errors');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const ejs = require('ejs');

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

module.exports.admin_generate_report = async (req, res, next) => {
    let a_id = req.query.a_id;
    let r_type = req.query.r_type;
    let sql = '';
    let params = [];

    if (r_type === 'book') {
        sql = 'SELECT * FROM book INNER JOIN admin ON book.b_genre = admin.a_perm AND admin.a_id = ?';
        params = [a_id];
    } else if (r_type === 'order') {
        sql = 'SELECT * FROM `order` INNER JOIN track ON track.o_id = order.o_id AND track.a_id = ?';
        params = [a_id];
    } else {
        sql = 'SELECT * FROM user';
        params = [];
    }
    try {
        let result = await database.call(sql, params);
        let pdfTemplateHtml = await ejs.renderFile(appRoot.resolve('./views/report.ejs'), {data: result});
        let options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm'
          }
        let document = {
        html: pdfTemplateHtml,
        data: {

        },
        path: appRoot.resolve('./local/new.pdf')
        }
        await pdf.create(document, options);
        res.status(201).download(appRoot.resolve('./local/new.pdf'));
    } catch (e) {
        return next(e);
    }
};

module.exports.admin_add_book = async (req, res, next) => {
    let a_id = req.body.a_id;
    let b_name = req.body.b_name;
    let b_author = req.body.b_author;
    let b_genre = req.body.b_genre;
    let b_desc = req.body.b_desc;
    let b_img = req.body.b_img;

    let sql = 'INSERT INTO book SET ?';
    let params = [
        {
            b_name: b_name,
            b_author: b_author,
            b_genre: b_genre,
            b_desc: b_desc
        }
    ];
    try {
        let result = await database.call(sql, params);
        let base64Data = b_img.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(appRoot.resolve(`./local/${result.insertId + '.png'}`), base64Data, 'base64');
        response.created(res, {});
    } catch (e) {
        return next(e);
    }
};

module.exports.admin_checkout_book = async (req, res, next) => {
    let b_id = req.body.b_id;
    let u_id = req.body.u_id;

    let sql = 'SELECT O.o_id FROM `order` O INNER JOIN track ON track.o_id = O.o_id \
               AND track.b_id = ? AND track.u_id = ? WHERE O.iss_date <= ? AND O.ret_date >= ? AND O.o_state != 0';
    let params = [b_id, u_id, moment().format('YYYY/MM/DD'), moment().format('YYYY/MM/DD')];
    try {
        let result = await database.call(sql, params);
        let isValid = result.length;
        if (!isValid) {
            throw createError(400, `User not allowed to checkout with book with b_id ${b_id}`);
        }
        let listOfOrderIds = [];
        result.forEach(item => {
            listOfOrderIds.push(item.o_id);
        });
        sql = 'UPDATE `order` O SET O.o_state = ? WHERE O.o_id IN (?)';
        params = [2, listOfOrderIds];
        await database.call(sql, params);
        response.success(res, {});
    } catch (e) {
        return next(e);
    }
};

module.exports.admin_return_book = async (req, res, next) => {
    let b_id = req.body.b_id;
    let u_id = req.body.u_id;

    let sql = 'SELECT O.o_id FROM `order` O INNER JOIN track ON track.o_id = O.o_id \
               AND track.b_id = ? AND track.u_id = ? WHERE O.iss_date <= ? AND O.o_state != 0';
    let params = [b_id, u_id, moment().format('YYYY/MM/DD')];
    try {
        let result = await database.call(sql, params);
        let isValid = result.length;
        if (!isValid) {
            throw createError(400, `User has no order with b_id ${b_id}`);
        }
        let listOfOrderIds = [];
        result.forEach(item => {
            listOfOrderIds.push(item.o_id);
        });
        sql = 'UPDATE `order` O SET O.o_state = ? WHERE O.o_id IN (?)';
        params = [0, listOfOrderIds];
        await database.call(sql, params);
        response.success(res, {});
    } catch (e) {
        return next(e);
    }
};