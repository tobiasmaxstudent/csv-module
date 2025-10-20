import { CsvParser } from '../src/parseCSV.js'

// Simple test to verify that parseCSV works as expected
test('parseCSV basic functionality', () => {
  const csvString = 'name,age,city \n Alice,30,New York \n Bob,25,Los Angeles'
  const expectedOutput = [
    ['name', 'age', 'city'],
    ['Alice', '30', 'New York'],
    ['Bob', '25', 'Los Angeles']
  ]
  expect(new CsvParser().parseData(csvString)).toEqual(expectedOutput)
})
test('Test parse with ; as delimiter', () => {
  const csvString = 'name;number;country\n Thomas;10;Germany'
  const expectedOutput = [
    ['name', 'number', 'country'],
    ['Thomas', '10', 'Germany']
  ]
    expect(new CsvParser().parseData(csvString)).toEqual(expectedOutput)
})
test('handles Windows newlines \\r\\n', () => {
  const csv = 'a,b\r\n1,2\r\n3,4'
  expect(new CsvParser().parseData(csv)).toEqual([['a','b'], ['1','2'], ['3','4']])
})
test('rows can have different lengths (no strict width)', () => {
  const csv = 'a,b,c\n1,2\n3,4,5,6'
  expect(new CsvParser().parseData(csv)).toEqual([
    ['a','b','c'],
    ['1','2'],
    ['3','4','5','6']
  ])
})