const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stringHelper = require('helpers');
const propertyNames = require('csv/property-names');

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
exports.parseFile = () => {
    rl = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    return new Promise((res, rej) => {
        let i = 0;
        rl.on('line', (line) => {
            if (splitCSV(line).length === 15) {
                if (i === 0) {
                    csvObjectKeys = splitCSV(line);
                } else if (i >= 1 /*&& i <= 10*/) {
                    // map array to object
                    const mappedCsvObject = mapCsvArrayToObject(splitCSV(line));

                    // put csv object item into array
                    csvObjects.push(mappedCsvObject);
                }
            } else {
                // every line must contain 15 properties
                console.log('Not Valid line: ' + line);
            }
            i++;
        }).on('close', () => {
            return res(csvObjects);
        });
    })
};

/**
 * Get objects array unique keys
 * @param objectArray
 * @param key
 * @returns {*[]}
 */
distinctObjectByKey = (objectArray, key) => {
    let uniqueFlags = {};
    return objectArray.filter((entry) => {
        if (uniqueFlags[entry[key]]) {
            return false;
        }
        uniqueFlags[entry[key]] = true;
        return true;
    });
};

/**
 * Transform array into { key: value,... } object with keys
 * @param csvItemArray, one line from csv file
 */
mapCsvArrayToObject = (csvItemArray) => {
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
splitCSV = (csvLine) => {
    const regPattern = /((?<=,\s*\")([^\"]*|([^\"]*\"\"[^""]*\"\"\"\"[^\"]*)|([^\"]*\"\"[^\"]*)|([^\"]*\"\"[^""]*\"\"[^\"]*)+)(?=\"\s*,))|((?<=,)[^,\"]*(?=,))|([^,\"]+)/g;
    return csvLine.match(regPattern);
};
