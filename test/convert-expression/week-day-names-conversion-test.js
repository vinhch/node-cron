'use strict';

const { expect } = require('chai');
const conversion = require('../../src/convert-expression/week-day-names-conversion');

describe('week-day-names-conversion.js', () => {
    it('should convert week day names names', () => {
        let weekDays = conversion('Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday');
        expect(weekDays).to.equal('1,2,3,4,5,6,0');
    });

    it('should convert short week day names names', () => {
        let weekDays = conversion('Mon,Tue,Wed,Thu,Fri,Sat,Sun');
        expect(weekDays).to.equal('1,2,3,4,5,6,0');
    });

    it('should convert 7 to 0', () => {
        let weekDays = conversion('7');
        expect(weekDays).to.equal('0');
    });
});
