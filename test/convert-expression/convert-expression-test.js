'use strict';

const { expect } = require('chai');
const conversion = require('../../src/convert-expression');

describe('month-names-conversion.js', () => {
    it('should convert month names', () => {
        const expressions = conversion('* * * * January,February *'.split(' '));
        expect(expressions[4]).to.equal('1,2');
    });

    it('should convert week day names', () => {
        const expressions = conversion('* * * * * Mon,Sun'.split(' '));
        expect(expressions[5]).to.equal('1,0');
    });
});
