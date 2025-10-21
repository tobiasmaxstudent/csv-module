import { CsvTable } from '../src/csvTable.js'

describe('CsvTable - constructor and getters', () => {
  test('creates CsvTable with valid headers and rows', () => {
    const headers = ['Name', 'Age', 'City']
    const rows = [
      ['Alice', '30', 'New York'],
      ['Bob', '25', 'Los Angeles']
    ]
    const table = new CsvTable(headers, rows)
    expect(table.getHeaders()).toEqual(headers)
    expect(table.getRows()).toEqual(rows)
  })})
