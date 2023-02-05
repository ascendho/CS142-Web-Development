'use strict';

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    const re = /\{\{[^{}]*\}\}/g;
    let result = this.template;
    const properties = result.match(re);
    // console.log(properties);
    for (let i = 0; i < properties.length; i++) {
        // console.log(properties[i]);
        const property = properties[i].slice(2, -2);
        // console.log(property);
        if (dictionary[property] === undefined) {
            result = result.replace(properties[i], "");
        } else {
            result = result.replace(properties[i], dictionary[property]);
        }
    }
    return result;
};

// self-test
const template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
const dateTemplate = new Cs142TemplateProcessor(template);

const dictionary = {month: 'July', day: '1', year: '2016'};
let str = dateTemplate.fillIn(dictionary);

console.assert(str === 'My favorite month is July but not the day 1 or the year 2016');

const dictionary2 = {day: '1', year: '2016'};
str = dateTemplate.fillIn(dictionary2);

console.assert(str === 'My favorite month is  but not the day 1 or the year 2016');

