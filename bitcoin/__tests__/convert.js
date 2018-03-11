'use strict';

const convert = require('..');
const Big = require('big.js');



test('should default to returning a Number', () => {
  //convert(2, 'BTC', 'BTC');
  expect(typeof convert(2, 'BTC', 'BTC')).toBe('number');
});


test('should return a Number', () => {
  //convert(2, 'BTC', 'BTC', 'Number');
    expect(typeof convert(2, 'BTC', 'BTC', 'Number')).toBe('number');

});


test('should return a Big number', () => {
    expect( typeof convert(2, 'BTC', 'BTC', 'Big')).toBeInstanceOf('Big'); //

});

test('should return a String', () => {
  //convert(2100, 'mBTC', 'BTC', 'String');
  expect( typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe('string');
});


test('should convert an integer', () => {
  //convert(123456789012345, 'Satoshi', 'BTC', 'Number');
    expect(convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toEqual(1234567.89012345);
});

test('should convert a number', () => {
  //convert(1234567.89012345, 'BTC', 'Satoshi', 'Number');
  expect(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toEqual(123456789012345);

});

test('should convert a string', () => {
  //convert('2', 'BTC', 'BTC', 'Number');
  expect(convert('2', 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should convert a Big number', () => {
  //convert(new Big(2), 'BTC', 'BTC', 'Number');
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should convert a NaN to a Number', () => {
  //convert(NaN, 'BTC', 'BTC', 'Number');
  //convert(NaN, 'BTC', 'mBTC', 'Number');
  expect(typeof convert(NaN, 'BTC', 'BTC', 'Number')).toBe('number');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe('number');
});

test('should convert a NaN to a String', () => {
  //convert(NaN, 'BTC', 'BTC', 'String');
  //convert(NaN, 'BTC', 'mBTC', 'String');
  expect(typeof convert(NaN, 'BTC', 'BTC', 'String')).toBe('String');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe('String');
});

test('should not convert a NaN to a Big', () => {
  //convert(NaN, 'BTC', 'BTC', 'Big');
  expect(() => {convert(NaN, 'BTC', 'BTC', 'Big')}).toThrow(); //throws error
});

test('should handle rounding errors', () => {
  //convert(4.6, 'Satoshi', 'BTC', 'Number');
  //convert(0.000000046, 'BTC', 'Satoshi', 'Number');
  expect(typeof convert(4.6, 'Satoshi', 'BTC', 'Number')).toBe('number');
  expect(typeof convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBe('number');
});

test('should throw when untest is undefined', () => {
  //convert(new Big(2), 'x', 'BTC', 'Number');
  //convert(new Big(2), 'BTC', 'x', 'Number');
  //convert(NaN, 'x', 'BTC', 'Number');
  //convert(NaN, 'BTC', 'x', 'Number');
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow();
});

test('should throw when representaion is undefined', () => {
  //convert(2, 'BTC', 'mBTC', 'x');
  //convert(NaN, 'BTC', 'mBTC', 'x');
  
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow();
});

test('should allow untest aliases', () => {
  //convert(4.6, 'Satoshi', 'sat');
  //convert(4.6, 'μBTC', 'btest');
  
  expect(convert(4.6, 'Satoshi', 'sat')).toEqual(4.6);
  expect(convert(4.6, 'μBTC', 'btest')).toEqual(4.6);
});


//coverage of 80% not done here, plus only 2/4 functions covered, so I did look at the API readme to see other functions not covered by my tests to get to 80% at least.

//remove an unit
test('should remove an unit', () => {
  convert.removeUnit('BTC');
  expect(convert.units().includes('BTC')).not.toBeTruthy(); //btc should not be anymore in the units
});


//add an unit
test('should add an unit', () => {
  convert.addUnit('BTC', 0.1);
  expect(convert.units().includes('BTC')).toBeTruthy(); //btc should be added again
});

