// tests/parseCSV.test.js
import { parseCSV } from '../src/parseCSV.js';

describe('parseCSV', () => {
  test('basic: två rader, komma-separerad', () => {
    const input = 'a,b\n1,2';
    expect(parseCSV(input)).toEqual([['a','b'], ['1','2']]);
  });

    test('hanterar olika radslut', () => {
    const input = 'a,b\r\n1,2\r3,4\n5,6';
    expect(parseCSV(input)).toEqual([['a','b'], ['1','2'], ['3','4'], ['5','6']]);
  });

  test('hanterar fält med citattecken', () => {
    const input = 'a,"b,b"\n1,"2""2"';
    expect(parseCSV(input)).toEqual([['a','b,b'], ['1','2"2']]);
  });
});
