const sqlite3 = require('sqlite3')
exports.Database = class Database {
	constructor(dbPath, cb) {
		this.db = new sqlite3.Database(dbPath, (err) => {
			if (err) {
        		console.log('Could not connect to database', err)
      		} else {
      			cb(this);
        		console.log('Connected to database')
			}	
		})
	}
	run(sql){
		return this.db.run(sql);
	}
}

