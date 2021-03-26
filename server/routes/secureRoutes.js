const router = require('express').Router();
const reqlib = require('app-root-path').require;
const authorizeRequest = reqlib('/middleware/authorizeRequest');

/* Only people with role user can access these routes */
router.use('/user', authorizeRequest('user', ['/signup']), require('./user.js'));

/* Only people with role admin can access these routes */



module.exports = router;