import { CsvTable } from '../src/csvTable.js'

test('create table with headers and rows', () => {
  const table = new CsvTable(['name', 'age'], [['Alice', '25'], ['Bob', '30']])
  expect(table.getHeaders()).toStrictEqual(['name', 'age'])
  expect(table.getRowCount()).toBe(2)
  expect(table.getColumnCount()).toBe(2)
})

test('get cell by index', () => {
  const table = new CsvTable(['name', 'age'], [['Alice', '25']])
  expect(table.getCell(0, 0)).toBe('Alice')
  expect(table.getCell(0, 1)).toBe('25')
})

test('get cell by header name', () => {
  const table = new CsvTable(['name', 'age'], [['Alice', '25']])
  expect(table.getCellByHeader(0, 'name')).toBe('Alice')
  expect(table.getCellByHeader(0, 'age')).toBe('25')
})

test('index out of bounds throws', () => {
  const table = new CsvTable(['name'], [['Alice']])
  expect(() => table.getCell(5, 0)).toThrow('Index out of bounds')
  expect(() => table.getCell(0, 10)).toThrow('Index out of bounds')
})

test('unknown column throws', () => {
  const table = new CsvTable(['name'], [['Alice']])
  expect(() => table.getCellByHeader(0, 'age')).toThrow('Unknown column: age')
})

test('select columns', () => {
  const table = new CsvTable(['name', 'age', 'city'], [['Alice', '25', 'Stockholm']])
  const selected = table.selectColumns(['name', 'city'])
  expect(selected.getHeaders()).toStrictEqual(['name', 'city'])
  expect(selected.getCell(0, 0)).toBe('Alice')
  expect(selected.getCell(0, 1)).toBe('Stockholm')
})

test('create table from CSV string', () => {
  const csv = 'name,age\nAlice,25\nBob,30'
  const table = CsvTable.fromCSV(csv)
  expect(table.getHeaders()).toStrictEqual(['name', 'age'])
  expect(table.getRowCount()).toBe(2)
  expect(table.getCell(0, 0)).toBe('Alice')
})

test('create table from CSV without headers', () => {
  const csv = 'Alice,25\nBob,30'
  const table = CsvTable.fromCSV(csv, { headers: false })
  expect(table.getHeaders()).toStrictEqual(['column1', 'column2'])
  expect(table.getCell(0, 0)).toBe('Alice')
})
 