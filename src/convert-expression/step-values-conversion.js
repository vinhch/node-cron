'use strict';

module.exports = (() => {
    const stepValuePattern = /^(.+)\/(\w+)$/;
    function convertSteps(expressions){
        for(let i = 0; i < expressions.length; i++){
            let match = stepValuePattern.exec(expressions[i]);
            let isStepValue = match !== null && match.length > 0;
            if(isStepValue){
                let baseDivider = match[2];
                if(isNaN(baseDivider)){
                    throw baseDivider + ' is not a valid step value';
                }
                let values = match[1].split(',');
                let stepValues = [];
                let divider = parseInt(baseDivider, 10);
                let valuesLength = values.length;
                for(let j = 0; j <= valuesLength; j++){
                    let value = parseInt(values[j], 10);
                    if(value % divider === 0){
                        stepValues.push(value);
                    }
                }
                expressions[i] = stepValues.join(',');
            }
        }
        return expressions;
    }

    return convertSteps;
})();
