const sqlite3 = require('sqlite3')
class Database {
	constructor(dbPath) {
		this.db = new sqlite3.Database(dbPath, (err) => {
			if (err) {
        		console.log('Could not connect to database', err)
      		} else {
        		console.log('Connected to database')
			}	
		})
	}
	createTableIfNotExists(tableName, columnCreationArgs) {
		const sql = `
		CREATE TABLE IF NOT EXISTS ${tableName} (${columnCreationArgs.join()})`
		return this.db.run(sql);
	}

}
const db = new Database('./test.db')
exports.instance = db;
