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
 * @type {Array}
 */
let csvObjects = [];

/**
 * Array of csv keys
 * @type {Array}
 */
let csvObjectKeys = [];

/**
 * Entry-point for parsing CSV file
 */
exports.parseFile = async function () {
    rl = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    let i = 0;
    rl.on('line', function (line) {
        if (splitCSV(line).length === 15) {
            if (i === 0) {
                csvObjectKeys = splitCSV(line);
            } else if (i >= 1 && i <= 15) {
                // map array to object
                const mappedCsvObject = mapCsvArrayToObject(splitCSV(line));

                // put csv item object into array
                csvObjects.push(mappedCsvObject);
            }
        } else {
            console.log('Not Valid line: ' + line);
        }
        i++;
    });

};

getCsvObjects = function() {
    console.log(csvObjects);
    return csvObjects;
};

/**
 * Transform array into { key: value,... } object with keys
 * @param csvItemArray, one line from csv file
 */
mapCsvArrayToObject = function (csvItemArray) {
    let csvObject = {};

    csvObjectKeys.forEach((item, index) => {
        csvObject[item] = csvItemArray[index];
    });

    return csvObject;
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