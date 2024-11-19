'use strict';
module.exports = (() => {
    const months = ['january','february','march','april','may','june','july',
        'august','september','october','november','december'];
    const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug',
        'sep', 'oct', 'nov', 'dec'];

    function convertMonthName(expression, items){
        const arrLength = items.length;
        for(let i = 0; i < arrLength; i++){
            expression = expression.replace(new RegExp(items[i], 'gi'), i + 1);
        }
        return expression;
    }

    function interpret(monthExpression){
        monthExpression = convertMonthName(monthExpression, months);
        monthExpression = convertMonthName(monthExpression, shortMonths);
        return monthExpression;
    }

    return interpret;
})();
