const db = require('db');
const csv_parser = require('csv');

csv_parser.parseFile().then(x => console.log(x));

//db.connect();
//db.close_conn();