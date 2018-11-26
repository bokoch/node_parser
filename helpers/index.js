/**
 * Remove dash and numbers in the END of string
 * (Need for trainer name field)
 * @param str
 */
exports.trimDashAndNumbers = (str) => {
    const regExpPattern = /(\W\d+$)/g;
    return str.replace(regExpPattern, '');
};

/**
 * Remove chars in round brackets and doubles quotemarks
 * (Need for athletes full_name field)
 * @param str
 */
exports.removeCharsInBrackets = (str) => {
    const regExpPattern = /(\(.*?\))|(\"\".*?\"\")/g;
    return str.replace(regExpPattern, '').trim();
};