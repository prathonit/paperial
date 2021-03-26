const router = require('express').Router();
const reqlib = require('app-root-path').require;
const validateRequest = reqlib('/routes/schemas');
const userController = reqlib('/controllers/user.js');

// get profile details for the user
router.get('/profile', validateRequest('user', [], 'get'), userController.user_get_profile);

// update user profile
router.post('/profile', validateRequest('user', ['u_name', 'u_mob', 'u_role'], 'post'), userController.user_update_profile);

// change user password 
router.post('/change-password', validateRequest('user', ['c_pwd', 'n_pwd'], 'post'), userController.user_change_pwd)

// register a new user
router.post('/signup', validateRequest('user', ['u_mail', 'u_name', 'u_mob', 'u_role', 'pwd'], 'post'), userController.user_signup_profile);


module.exports = router;
