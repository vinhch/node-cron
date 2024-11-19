'use strict';
module.exports = (() => {
    function convertAsterisk(expression, replacement){
        if(expression.indexOf('*') !== -1){
            return expression.replace('*', replacement);
        }
        return expression;
    }

    function convertAsterisksToRanges(expressions){
        // second
        expressions[0] = convertAsterisk(expressions[0], '0-59');
        // minute
        expressions[1] = convertAsterisk(expressions[1], '0-59');
        // hour
        expressions[2] = convertAsterisk(expressions[2], '0-23');
        // day, 0-30 in array, 1-31 in config
        // leave 'L' to calculate lastDayOfMonth later
        expressions[3] = ['l', 'L'].indexOf(expressions[3]) !== -1 ? expressions[3] : convertAsterisk(expressions[3], '1-31');
        // month, 0-11 in array, 1-12 in config
        expressions[4] = convertAsterisk(expressions[4], '1-12');
        // dayOfWeek, 0-7 Where 0 = Sunday and 7 = Sunday; Value is a bitmask
        expressions[5] = convertAsterisk(expressions[5], '0-6');
        return expressions;
    }

    return convertAsterisksToRanges;
})();
