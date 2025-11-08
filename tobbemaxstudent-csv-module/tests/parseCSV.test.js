import { CsvParser } from '../src/parseCSV.js'

test('parse simple CSV', () => {
  const parser = new CsvParser()
  const csv = 'a,b,c\n1,2,3'
  expect(parser.parseData(csv)).toStrictEqual([
    ['a', 'b', 'c'],
    ['1', '2', '3']
  ])
})

test('parse CSV with semicolon', () => {
  const parser = new CsvParser()
  const csv = 'a;b;c\n1;2;3'
  expect(parser.parseData(csv)).toStrictEqual([
    ['a', 'b', 'c'],
    ['1', '2', '3']
  ])
})

test('parse empty string', () => {
  const parser = new CsvParser()
  expect(parser.parseData('')).toStrictEqual([])
})

test('trim cells by default', () => {
  const parser = new CsvParser({ trimCells: true })
  const csv = ' a , b , c '
  expect(parser.parseData(csv)).toStrictEqual([['a', 'b', 'c']])
})

test('handle empty lines', () => {
  const parser = new CsvParser()
  const csv = 'a,b\n\n1,2'
  expect(parser.parseData(csv)).toStrictEqual([
    ['a', 'b'],
    [],
    ['1', '2']
  ])
})