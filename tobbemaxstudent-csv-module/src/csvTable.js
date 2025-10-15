import { parseCSV } from "./parseCSV.js"
import { stringifyCSV } from "./stringifyCSV.js"
export class CsvTable {
    /**
     * 
     * @param {string []} headers
     * @param {string [][]} rows 
     */
    constructor(headers,rows) { // Bryt ut felhantering
        
    if (!Array.isArray(headers) || !Array.isArray(rows)) {
        throw new TypeError('Headers and rows must be arrays') //Eventuellt centralisera felhantering
    }
    if (!headers.every(h => typeof h === 'string')) {
        throw new TypeError('All headers must be strings')
    }
    const seen = new Set() //Byt namn på h till header
    for (const h of headers) {
      if (seen.has(h)) throw new TypeError(`Duplicate header: ${h}`)
      seen.add(h)
    }
    this.headers = headers.slice()
    this.rows = rows.map((row, rIdx) => {
      if (!Array.isArray(row)) {
        throw new TypeError(`Row at index ${rIdx} is not an array`)
      }
      if (row.length !== headers.length) {
        throw new TypeError(`Row ${rIdx} has length ${row.length}, expected ${headers.length}`) // byt namn på ridx till rowIndex
      }
      return row.slice()
    })
    this.columnIndex = new Map(this.headers.map((header, index) => [header, index]))
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
        if (rowIndex < 0 || rowIndex >= this.getRowCount() || columnIndex < 0 || columnIndex >= this.getColumnCount()) {
            throw new TypeError('Index out of bounds')
        }
        return this.rows[rowIndex][columnIndex]
    }
   getColumnIndex(name) {
    const idx = this.columnIndex.get(name) // Byt namn på idx till index eller annat
    if (idx === undefined) throw new TypeError(`Unknown column: ${name}`)
    return idx
  }
  getCellByHeader(rowIndex, headerName) {
    return this.getCell(rowIndex, this.getColumnIndex(headerName))
    }
  
  selectColumns(names) {
    if (!Array.isArray(names) || names.length === 0) {
        throw new TypeError('Names must be a non-empty array')
    }
    const idxs = names.map(name => {
        const idx = this.columnIndex.get(name)
        if (idx === undefined) throw new TypeError(`Unknown column: ${name}`)
        return idx
    })
    const newRows = this.rows.map(row => idxs.map(i => row[i]))
    return new CsvTable(names.slice(), newRows)
    }

  static fromCSV(text, {headers = true, ...parserOptions} = {}) {
        const rows = parseCSV(text, parserOptions)
        if (headers) {
            const [head = [], ...rest ] = rows
            return new CsvTable(head, rest)
        }
        const width = Math.max(0, ...rows.map(r => r.length))
        const autoHeaders = Array.from({length: width}, (_, i) => `column${i+1}`)
        return new CsvTable(autoHeaders, rows)
    }
    map(mapper) {
    if (typeof mapper !== 'function') {
      throw new TypeError('mapper must be a function');
    }
    const out = [];
    for (let i = 0; i < this.rows.length; i++) {
      const rowCopy = this.rows[i].slice();
      const mapped = mapper(rowCopy, i, this);
      if (!Array.isArray(mapped)) {
        throw new TypeError('mapper must return an array');
      }
      if (mapped.length !== this.headers.length) {
        throw new TypeError(
          `Mapped row length ${mapped.length} does not match headers length ${this.headers.length}`
        );
      }
      out.push(mapped.slice())
    }
    return new CsvTable(this.headers.slice(), out)
  }

    toCSV(stringifyOptions) {
  return stringifyCSV([this.getHeaders(), ...this.getRows()], stringifyOptions)
}
}
