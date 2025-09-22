class CsvTable {
    constructor(csvString) {
        
        this.headers = [];
        this.rows = [];
        this.parseCsv(csvString);
    }
    parseCsv(csvString) {
        const lines = csvString.trim().split('\n');
        this.headers = lines[0].split(',').map(header => header.trim());
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',').map(cell => cell.trim());
            this.rows.push(row);
        }
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
    getCell(rowIndex, colIndex) {
        if (rowIndex < 0 || rowIndex >= this.getRowCount() || colIndex < 0 || colIndex >= this.getColumnCount()) {
            throw new Error('Index out of bounds');
        }
        return this.rows[rowIndex][colIndex];
    }
}