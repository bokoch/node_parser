const fs = require('fs');
const path = require('path');
const readline = require('readline');

let filePath = path.join(__dirname, '../resource/athlete_events.csv');
let rl;

exports.open_file = function () {
    rl = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    let i = 0;
    rl.on('line', function (line) {
        // if (line.splitCSV().length !== 15) {
        //     console.log(line);
        // }
        if (splitCSV(line).length !== 15) {
            parseCSV(line);
        }
        i++;
    });
};

parseCSV = function (line) {
    const regPattern = /(?:,"|^")(""|[\w\W]*?)(?=,|"$)|(?:,(?!")|^(?!"))([^,]*?)(?=$|,)/;

    console.log(line);

    // console.log(line.split(regPattern).length);
    /*const lineParams = line.split('\",\"');
    const trimParams = lineParams.map(item => {
        // console.log(item.replace(/\"/g, ''));
    })*/
};

splitCSV = function(str) {
    let matches = str.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
    for (let i = 0; i < matches.length; i++) {
        matches[i] = matches[i].trim();
        matches[i] = matches[i].replace(/(^")/, '');
        matches[i] = matches[i].replace(/("$)/, '');
        if (matches[i] === ',') matches[i] = '';
    }
    if (str[0] === ',') matches.unshift("");
    return matches;
};