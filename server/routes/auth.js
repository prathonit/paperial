const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const authController = reqlib('/controllers/auth.js');

// login for normal user
router.post('/user', validateRequest('auth', ['u_id', 'pwd'], 'post'), authController.auth_login_user);

// login for users when admin access
router.post('/admin', validateRequest('auth', ['a_id', 'pwd'], 'post'), authController.auth_login_admin);

module.exports = router;

