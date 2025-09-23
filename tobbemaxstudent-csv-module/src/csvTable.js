class CsvTable {
    /**
     * 
     * @param {string []} headers
     * @param {string [][]} rows 
     */
    constructor(headers,rows) {
        
    if (!Array.isArray(headers) || !Array.isArray(rows)) {
        throw new Error('Headers and rows must be arrays')
    }
    this.headers = headers.slice()
    this.rows = rows.map(row => row.slice())
    this.columnIndex = new Map(this.headers.map((header, index) => [header, index]))

}
    getHeaders() {
        return this.headers;
    }

    getRows() {
        return this.rows;
    }
    getRowCount() {
        return this.rows.length;
    }
    getColumnCount() {
        return this.headers.length;
    }
    getCell(rowIndex, columnIndex) {
        if (rowIndex < 0 || rowIndex >= this.getRowCount() || columnIndex < 0 || columnIndex >= this.getColumnCount()) {
            throw new Error('Index out of bounds');
        }
        return this.rows[rowIndex][columnIndex];
    }
   getColumnIndex(name) {
    const idx = this.columnIndex.get(name)
    if (idx === undefined) throw new Error(`Okänd kolumn: ${name}`)
    return idx
  }
  getByHeader(rowIndex, headerName) {
    return this.getCell(rowIndex, this.getColumnIndex(headerName));
  }
  
}