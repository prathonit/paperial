const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.status(200).json({ id: 2019 });
});

module.exports = router;
