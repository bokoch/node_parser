const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stringHelper = require('helpers');
const propertyNames = require('csv/property-names');

var Teams = require('model/teams');

let filePath = path.join(__dirname, '../resource/athlete_events.csv');
/**
 * readline instance
 */
let rl;

/**
 * Array of csv keys
 * @type {Array}
 */
let csvObjectKeys = [];

/**
 * Entities objects
 * @type {{}}
 */
let teams = new Teams();
let athletes = {};
let events = {};
let games = {};
let sports = {};
let results = {};

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
                let mappedCsvObject;
                if (i === 0) {
                    csvObjectKeys = splitCSV(line);
                } else if (i > 0 /*&& i < 50*/) {
                    // map array to object
                    mappedCsvObject = mapCsvArrayToObject(splitCSV(line));

                    teams.pushTeam(mappedCsvObject.Team, mappedCsvObject.NOC)

                }
            } else {
                // every line must contain 15 properties
                throw new Error('Not Valid line: ' + line);
            }
            i++;
        }).on('close', () => {
            console.log(teams.teams);
            return res({});
        }).on('error', (e) => {
            return rej(e);
        });
    })
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
