const db = require('../db.js')
function initCoreTables(){
	console.log(db.instance.createTableIfNotExists('points', ['user_id INTEGER PRIMARY KEY', 'points INTEGER DEFAULT 0']))
}
initCoreTables();