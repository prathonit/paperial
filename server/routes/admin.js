const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const adminController = reqlib('/controllers/admin.js');

// login for normal user
router.get('/books', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_books);

router.get('/orders', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_orders);

router.get('/users', validateRequest('admin', ['offset', 'count'], 'get'), adminController.admin_get_users);

router.get('/reports', validateRequest('admin', ['a_id', 'r_type'], 'get'), adminController.admin_generate_report);

router.post('/checkout', validateRequest('admin', ['a_id', 'u_id', 'b_id'], 'post'), adminController.admin_checkout_book);

router.post('/return', validateRequest('admin', ['a_id', 'u_id', 'b_id'], 'post'), adminController.admin_return_book);

router.post('/add_book', validateRequest('admin', ['a_id', 'b_name', 'b_author', 'b_genre', 'b_img', 'b_desc'], 'post'), adminController.admin_add_book);

module.exports = router;