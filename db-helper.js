const db = require('./db.js');
exports.initialize = function(dbNames) {
	const dbs = initDbs(dbNames); 
	exports.dbs = dbs
}
function initDbs(dbNames) {
	let dbs = {};
	for (const i in dbNames) {
		dbs[i] = new db.Database(`./${dbNames[i]}.db`);
	}
	return dbs;
}
