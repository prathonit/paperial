const express = require('express');
const router = express.Router();

/* List all routes here */
router.use('/auth', require('./auth.js'));

/* Secure routes */
router.use('/secure', require('./secureRoutes'));

module.exports = router;
