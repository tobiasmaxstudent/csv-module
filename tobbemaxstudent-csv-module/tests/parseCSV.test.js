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