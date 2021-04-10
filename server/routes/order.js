const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const orderController = reqlib('/controllers/order.js');

router.post('/place', validateRequest('order', ['u_id', 'b_id', 'from', 'to'], 'post'), orderController.order_place_order);

router.get('/availability', validateRequest('order', ['b_id'], 'get'), orderController.order_get_future_orders);

router.get('/my_orders', validateRequest('order', ['u_id', 'offset', 'count'], 'get'), orderController.order_get_orders_by_u_id);
module.exports = router;
