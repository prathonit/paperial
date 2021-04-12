const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const adminController = reqlib('/controllers/admin.js');
const response = reqlib('/utils/response').response;
const mailer = reqlib('./utils/mailer.js');

// login for normal user
router.get('/books', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_books);

router.get('/orders', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_orders);

router.get('/users', validateRequest('admin', ['offset', 'count'], 'get'), adminController.admin_get_users);

router.get('/reports', validateRequest('admin', ['a_id', 'r_type'], 'get'), adminController.admin_generate_report);

router.post('/checkout', validateRequest('admin', ['a_id', 'u_id', 'b_id'], 'post'), adminController.admin_checkout_book);

router.post('/return', validateRequest('admin', ['a_id', 'u_id', 'b_id'], 'post'), adminController.admin_return_book);

router.post('/add_book', validateRequest('admin', ['a_id', 'b_name', 'b_author', 'b_genre', 'b_img', 'b_desc'], 'post'), adminController.admin_add_book);

router.post('/mail', validateRequest('admin', ['u_mail', 'm_subject', 'm_body'], 'post'), async (req, res, next) => {
    try {
        await mailer.sendMail(req.body.u_mail, req.body.m_subject, req.body.m_body);
        response.success(res, {}, 'Mail sent to user');
    } catch (e) {
        return next(e);
    }
});

module.exports = router;