const pool = require('./_pool');

let callDb = (query, params) => {
	return new Promise((resolve, reject) => {
		pool.query(query, params, (err, result, fields) => {
			if (err) {
				err.message = 'Database connection error';
				err.status = 500;
				return reject(err);
			}
			return resolve(result);
		});
	});
};

module.exports = {
	pool: pool,
	call: callDb
};