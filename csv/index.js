const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stringHelper = require('helpers');

const Teams = require('model/teams');
const Athletes = require('model/athletes');
const Events = require('model/events');
const Games = require('model/games');
const Sports = require('model/sports');
const Results = require('model/results');

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
let athletes = new Athletes();
let events = new Events();
let sports = new Sports();
let games = new Games();
let results = new Results();

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
            const splitLine = splitCSV(line);
            if (splitLine !== null && splitLine.length === 15) {
                let mappedCsvObject;
                if (i === 0) {
                    csvObjectKeys = splitLine;
                } else if (i > 0) {
                    // map array to object
                    mappedCsvObject = mapCsvArrayToObject(splitLine);

                    const sportId = sports.pushSport(mappedCsvObject.Sport);
                    const eventId = events.pushEvent(mappedCsvObject.Event);

                    const gameId = games.pushGame(mappedCsvObject.Year, mappedCsvObject.Season, mappedCsvObject.City);

                    const teamId = teams.pushTeam(stringHelper.trimDashAndNumbers(mappedCsvObject.Team), mappedCsvObject.NOC);
                    const athletesId = athletes.pushAthlete(...formatAthleteData(mappedCsvObject, teamId));

                    const resultId = results.pushResult(athletesId, gameId, sportId, eventId, Results.medalEnum[mappedCsvObject.Medal]);
                }
            } else {
                // every line must contain 15 properties
                console.log('Not Valid line: ' + i + ': ' + line);
                // throw new Error('Not Valid line: ' + line);
            }
            i++;
        }).on('close', () => {
            console.log(results.getResults());
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

/**
 * Format object according to athlete fields
 * @param obj
 * @param team_id
 */
formatAthleteData = (obj, team_id) => {
    let params = {};
    let year_of_birth = null;

    if (obj.Height !== 'NA') {
        params['height'] = obj.Height;
    }
    if (obj.Weight !== 'NA') {
        params['weight'] = obj.Weight;
    }

    if (obj.Age !== 'NA' && obj.Year !== 'NA') {
        year_of_birth = obj.Year - obj.Age;
    }

    return [
        obj.ID,
        stringHelper.removeCharsInBrackets(obj.Name),
        (obj.Sex !== 'NA') ? Athletes.sexEnum[obj.Sex] : null,
        year_of_birth,
        JSON.stringify(params),
        team_id,
    ];
};