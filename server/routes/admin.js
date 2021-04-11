const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const adminController = reqlib('/controllers/admin.js');

// login for normal user
router.get('/books', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_books);

router.get('/orders', validateRequest('admin', ['a_id', 'offset', 'count'], 'get'), adminController.admin_get_orders);

router.get('/users', validateRequest('admin', ['offset', 'count'], 'get'), adminController.admin_get_users);

module.exports = router;