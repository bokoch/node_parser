const fs = require('fs');
const path = require('path');
const readline = require('readline');

let filePath = path.join(__dirname, '../resource/athlete_events.csv');
/**
 * readline instance
 */
let rl;

/**
 * Array of csv item objects
 */
let csvObjects = [];

/**
 * Entry-point for parsing CSV file
 */
exports.parseFile = function () {
    rl = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    let i = 0;
    rl.on('line', function (line) {
        if (splitCSV(line).length === 15) {

        } else {
            console.log('Not Valid line: ' + line);
        }
        i++;
    });
};

/**
 * Transform array into { key: value,... } object with keys
 * @param line
 */
mapCsvArrayToObject = function (line) {
    console.log(line);
};

/**
 * Parse csv line into array
 * @param csvLine
 * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
 */
splitCSV = function(csvLine) {
    const regPattern = /((?<=,\s*\")([^\"]*|([^\"]*\"\"[^""]*\"\"\"\"[^\"]*)|([^\"]*\"\"[^\"]*)|([^\"]*\"\"[^""]*\"\"[^\"]*)+)(?=\"\s*,))|((?<=,)[^,\"]*(?=,))|([^,\"]+)/g;
    return csvLine.match(regPattern);
};