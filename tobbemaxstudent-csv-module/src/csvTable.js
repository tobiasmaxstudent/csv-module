import { CsvParser } from "./parseCSV.js"
export class CsvTable {
  /**
   * 
   * @param {string []} headers
   * @param {string [][]} rows 
   */
  constructor(headers, rows) {
    this.#assertIfArraysAreValid(headers, 'Headers must be an array')
    this.#assertIfArraysAreValid(rows, 'Rows must be an array of arrays')
    if (!headers.every(header => typeof header === 'string')) {
      throw new TypeError('All headers must be strings')
    }
    this.#checkDuplicateHeaders(headers)
    const rowLength = headers.length
    const rowsCopy = rows.map((row, rowIndex) => {
      this.#assertIfArraysAreValid(row, `Row at index ${rowIndex} is not an array`)
      if (row.length !== rowLength) {
        throw new TypeError(`Row ${rowIndex} has length ${row.length}, expected ${rowLength}`)
      }
      return row.slice()
    })

    this.headers = headers.slice()
    this.rows = rowsCopy
    this.columnIndex = this.#buildColumnIndex(this.headers)
  }

  #checkDuplicateHeaders(headers) {
    const seen = new Set()
    for (const header of headers) {
      if (seen.has(header)) throw new TypeError(`Duplicate header: ${header}`)
      seen.add(header)
    }
  }


  #assertIfArraysAreValid(array, errorMessage) {
    if (!Array.isArray(array)) {
      throw new TypeError(errorMessage)
    }
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