'use strict';

const monthNamesConversion = require('./month-names-conversion');
const weekDayNamesConversion = require('./week-day-names-conversion');
const convertAsterisksToRanges = require('./asterisk-to-range-conversion');
const convertRanges = require('./range-conversion');
const convertSteps = require('./step-values-conversion');

module.exports = (() => {

    function appendSecondExpression(expressions){
        if(expressions.length === 5) expressions.unshift('0');
        return expressions;
    }

    // Function that takes care of normalization.
    function normalizeIntegers(expressions) {
        for (let i=0; i < expressions.length; i++){
            const numbers = expressions[i].split(',');
            const numbersLength = numbers.length;
            for (let j=0; j<numbersLength; j++){
                if (['l', 'L'].indexOf(numbers[j]) === -1)
                    numbers[j] = parseInt(numbers[j]);
            }
            expressions[i] = numbers.join(',');
        }
        return expressions;
    }

    /*
   * The node-cron core allows only numbers (including multiple numbers e.g 1,2).
   * This module is going to translate the month names, week day names and ranges
   * to integers relatives.
   *
   * Month names example:
   *  - expression 0 1 1 January,Sep *
   *  - Will be translated to 0 1 1 1,9 *
   *
   * Week day names example:
   *  - expression 0 1 1 2 Monday,Sat
   *  - Will be translated to 0 1 1 1,5 *
   *
   * Ranges example:
   *  - expression 1-5 * * * *
   *  - Will be translated to 1,2,3,4,5 * * * *
   */
    function interpret(expressions){
        /**
         * expressions index:
         * [0] - second, 0-59
         * [1] - minute, 0-59
         * [2] - hour, 0-23
         * [3] - day, 0-30 in array, 1-31 in config
         * [4] - month, 0-11 in array, 1-12 in config
         * [5] - dayOfWeek, 0-7 Where 0 = Sunday and 7 = Sunday; Value is a bitmask
         */
        expressions = appendSecondExpression(expressions);
        expressions[4] = monthNamesConversion(expressions[4]);
        expressions[5] = weekDayNamesConversion(expressions[5]);
        expressions = convertAsterisksToRanges(expressions);
        expressions = convertRanges(expressions);
        expressions = convertSteps(expressions);

        expressions = normalizeIntegers(expressions);

        return expressions;
    }

    return interpret;
})();
