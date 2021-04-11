const config = require('../../../config.js');
const fs = require('fs');
const mysql = require('mysql');

const username = config.DB_USER;
const password = config.DB_PASSWORD;
const dbName = config.DB_NAME;
const hostName = config.DB_HOST;

const main = async (username, password, dbName, hostName) => {
	const con = mysql.createConnection({
		host:  hostName,
		user: username,
		password: password,
		database: dbName
	});
	await con.connect();

	let files = fs.readdirSync('./');
	let regex = /.sql/;
	for (let i=0; i<files.length; i++) {
		if (!files[i].match(regex)) {
			continue;
		}
		let file_content = fs.readFileSync(files[i], 'utf8');
		con.query(file_content);
	}
	console.log('Finished creating tables'); 
};

try {
	main(username, password, dbName, hostName);
} catch (e) {
	console.log('Error occurred during table creation, check the exact status manually ...');
	console.log(e);
}
