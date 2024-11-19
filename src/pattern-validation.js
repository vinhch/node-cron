'use strict';

const {removeSpaces} = require('./utils');
const convertExpression = require('./convert-expression');

const validationRegex = /^(?:\d+|\*|\*\/\d+)$/;

/**
 * @param {string} expression The Cron-Job expression.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {boolean}
 */
function isValidExpression(expression, min, max) {
    const options = expression.split(',');
    let optionsLength = options.length;

    for (let i=0; i < optionsLength; i++) {
        const optionAsInt = parseInt(options[i], 10);

        if (
            (!Number.isNaN(optionAsInt) &&
                (optionAsInt < min || optionAsInt > max)) ||
            !validationRegex.test(options[i])
        )
            return false;
    }

    return true;
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidSecond(expression) {
    return !isValidExpression(expression, 0, 59);
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidMinute(expression) {
    return !isValidExpression(expression, 0, 59);
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidHour(expression) {
    return !isValidExpression(expression, 0, 23);
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidDayOfMonth(expression) {
    return ['l', 'L'].indexOf(expression) === -1 && !isValidExpression(expression, 1, 31);
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidMonth(expression) {
    return !isValidExpression(expression, 1, 12);
}

/**
 * @param {string} expression The Cron-Job expression.
 * @returns {boolean}
 */
function isInvalidWeekDay(expression) {
    return !isValidExpression(expression, 0, 7);
}

/**
 * @param {string[]} patterns The Cron-Job expression patterns.
 * @param {string[]} executablePatterns The executable Cron-Job expression
 * patterns.
 * @returns {void}
 */
function validateFields(patterns, executablePatterns) {
    if (isInvalidSecond(executablePatterns[0]))
        throw new Error(`${patterns[0]} is a invalid expression for second`);

    if (isInvalidMinute(executablePatterns[1]))
        throw new Error(`${patterns[1]} is a invalid expression for minute`);

    if (isInvalidHour(executablePatterns[2]))
        throw new Error(`${patterns[2]} is a invalid expression for hour`);

    if (isInvalidDayOfMonth(executablePatterns[3]))
        throw new Error(
            `${patterns[3]} is a invalid expression for day of month`
        );

    if (isInvalidMonth(executablePatterns[4]))
        throw new Error(`${patterns[4]} is a invalid expression for month`);

    if (isInvalidWeekDay(executablePatterns[5]))
        throw new Error(`${patterns[5]} is a invalid expression for week day`);
}

const charRegex = /^[a-zA-Z0-9-*/, ]+$/;

/**
 * Validates a Cron-Job expression pattern.
 *
 * @param {string} pattern The Cron-Job expression pattern.
 * @returns {string} The sanitized pattern
 * @throws {Error} Throw error if pattern is not valid
 */
function validate(pattern) {
    if (typeof pattern !== 'string')
        throw new TypeError('pattern must be a string!');

    pattern = removeSpaces(pattern);
    if (!charRegex.test(pattern))
        throw new TypeError('pattern includes illegal characters!');

    const executablePatterns = convertExpression(pattern.split(' '));
    const patterns = pattern.split(' '); // to create new ref
    if (patterns.length === 5) patterns.unshift('0');

    validateFields(patterns, executablePatterns);
    return pattern;
}

module.exports = validate;
