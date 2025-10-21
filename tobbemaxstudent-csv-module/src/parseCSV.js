import { CSVFormat } from "./csvFormat"

export class CsvParser {
    constructor(format) {
        this.format = format instanceof CSVFormat ? format : new CSVFormat(format)
    }
    #detectDelimiter(firstLine) {
        const comma = (firstLine.match(/,/g) || []).length
        const semicolon = (firstLine.match(/;/g) || []).length
        if (semicolon > comma) return ';'
        if (comma > semicolon) return ','
        
    }
    parseData(data) {
        if (!data) {
            return []
        }
        const text = String(data).replace(/^\uFEFF/, "")
        const lines = text.split(/\r\n|\n|\r/)

        const delimiter = this.#detectDelimiter(lines[0])
        const trim = this.format.trimCells
        const rows = []
        for (const line of lines) {
            if (line === '') {
                rows.push([])
                continue
            }
            const cells = line.split(delimiter)
            rows.push(trim ? cells.map(cell => cell.trim()) : cells)
        }
        return rows
    }
}

