const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, '../resource/athlete_events.csv');

exports.open_file = function () {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
           parseCsv(data);
        } else {
            console.log(err);
        }
    });
};

parseCsv = function (data) {
    console.log(data);
};