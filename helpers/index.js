/**
 * Remove dash and numbers in the END of string
 * (Need for trainer name field)
 * @param str
 */
exports.trimDashAndNumbers = (str) => {
    const regExpPattern = /(\W\d$)/g;
    return str.replace(regExpPattern, '');
};