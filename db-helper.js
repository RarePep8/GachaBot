const db = require('./db.js');

exports.initialize = function(serverIdStrings) {
	const dbs = initDbs(serverIdStrings); 
	exports.dbs = dbs
	dbObj = dbs[serverIdStrings[0]];
}
function initDbs(serverIdStrings) {
	let dbs = {};
	for (const i in serverIdStrings) {
		dbs[serverIdStrings[i]] = new db.Database(`./${serverIdStrings[i]}.db`, function(dbo){
			dbo.run("CREATE TABLE IF NOT EXISTS points (user_id INTEGER PRIMARY KEY , points INTEGER DEFAULT 0)");
			dbo.run("CREATE TABLE IF NOT EXISTS inventory (pair_id INTEGER PRIMARY KEY , user_id INTEGER, item_id INTEGER)");
		});
	}
	return dbs;
}

exports.addPoints = function(serverIdString, userId, pointIncrease){
	exports.dbs[serverIdString].run(`UPDATE points SET points = points + ${pointIncrease} WHERE user_id=${userId};`);
	exports.dbs[serverIdString].run(`INSERT OR IGNORE INTO points (user_id, points) VALUES (${userId}, ${pointIncrease});`);
}


