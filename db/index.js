const sqlite3 = require('sqlite3').verbose();
let db;


let sql = `SELECT * FROM sports`;

exports.connect = function () {
    db = new sqlite3.Database('./resource/olympic_history.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
};

// close the database connection
exports.close_conn = function () {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};