import { CsvParser } from "./parseCSV.js"
import { Validator } from "./validator.js"
export class CsvTable {
  /**
   * Create a CsvTable instance.
   * @param {string []} headers - Array of column headers
   * @param {string [][]} rows - Array of rows, each row is an array of strings
   * @throws {TypeError} - If headers or rows are invalid
   */
  constructor(headers, rows) {
    const validator = new Validator()
    const { headersCopy, rowsCopy } = validator.validateTableInput(headers, rows)

    this.headers = headersCopy
    this.rows = rowsCopy
    this.columnIndex = this.#buildColumnIndex(this.headers)
  }

  #buildColumnIndex(headers) {
    return new Map(headers.map((header, index) => [header, index]))
  }
  getHeaders() {
    return this.headers.slice()
  }
  getRows() {
    return this.rows.map(row => row.slice())
  }
  getRowCount() {
    return this.rows.length
  }
  getColumnCount() {
    return this.headers.length
  }
  getCell(rowIndex, columnIndex) {
    if (rowIndex < 0 || rowIndex >= this.getRowCount() ||
      columnIndex < 0 || columnIndex >= this.getColumnCount()) {
      throw new TypeError('Index out of bounds')
    }
    return this.rows[rowIndex][columnIndex]
  }
  getColumnIndex(name) {
    const index = this.columnIndex.get(name)
    if (index === undefined) throw new TypeError(`Unknown column: ${name}`)
    return index
  }
  getCellByHeader(rowIndex, headerName) {
    return this.getCell(rowIndex, this.getColumnIndex(headerName))
  }
  selectColumns(names) {
    if (!Array.isArray(names) || names.length === 0) {
      throw new TypeError('Names must be a non-empty array')
    }
    const indexes = names.map(name => {
      const index = this.columnIndex.get(name)
      if (index === undefined) throw new TypeError(`Unknown column: ${name}`)
      return index
    })
    const newRows = this.rows.map(row => indexes.map(i => row[i]))
    return new CsvTable(names.slice(), newRows)
  }
  /**
   * Create a table from a CSV string.
   * @param {string} text - CSV text
   * @param {{ headers: boolean }} options - Whether to treat the first row as headers
   * @returns {CsvTable} - The created CsvTable
   */
  static fromCSV(text, { headers = true, ...parserOptions } = {}) {
    const rows = new CsvParser(parserOptions).parseData(text)
    if (headers) {
      const [header = [], ...rest] = rows
      return new CsvTable(header, rest)
    }
    const width = Math.max(0, ...rows.map(r => r.length))
    const autoHeaders = Array.from({ length: width }, (_, i) => `column${i + 1}`)
    return new CsvTable(autoHeaders, rows)
  }
}