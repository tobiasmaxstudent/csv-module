import { CSVFormat } from "../src/csvFormat";

test('defaults', () => {
    const format = new CSVFormat()
    expect(format.delimiter).toBe(',')
    expect(format.quote).toBe('"')
    expect(format.newline).toBe('\n')
})

test('custom delimiter', () => {
    const format = new CSVFormat({ delimiter: ';', quote: "'" })
    expect(format.delimiter).toBe(';')
    expect(format.quote).toBe("'")
})
test('invalid delimiter throws', () => { expect(() => new CSVFormat({ delimiter: ';;' })).toThrow('Delimiter must be a single character string')
  expect(() => new CSVFormat({ delimiter: '' })).toThrow('Delimiter must be a single character string')
  expect(() => new CSVFormat({ delimiter: 5 })).toThrow('Delimiter must be a single character string')
})

test('only comma and semicolon allowed', () => {
  expect(() => new CSVFormat({ delimiter: '|' })).toThrow('The delimiter must be a , or ;')
  expect(() => new CSVFormat({ delimiter: '\t' })).toThrow('The delimiter must be a , or ;')
})


test('invalid newline throws', () => {
  expect(() => new CSVFormat({ newline: '\r' })).toThrow("New line must be either \\n or \\r\\n")
})

test('boolean options must be boolean', () => {
  expect(() => new CSVFormat({ alwaysQuote: 'true' })).toThrow('alwaysQuote must be a boolean')
  expect(() => new CSVFormat({ trimCells: 1 })).toThrow('trimCells must be a boolean')
})
