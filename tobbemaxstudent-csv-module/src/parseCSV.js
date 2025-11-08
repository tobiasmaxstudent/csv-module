import { CSVFormat } from "./csvFormat.js";

export class CsvParser {
    constructor(format) {
        if (format === undefined) {
            this.format = new CSVFormat()
            this.autoDetectDelimiter = true
        } else {
            this.format = format instanceof CSVFormat ? format : new CSVFormat(format)
            this.autoDetectDelimiter = false
        }
}
    #detectDelimiter(firstLine) {
        const comma = (firstLine.match(/,/g) || []).length
        const semicolon = (firstLine.match(/;/g) || []).length
        return semicolon > comma ? ';' : ','
    }

    parseData(data) {
        if (!data) {
            return []
        }
        const text = String(data).replace(/^\uFEFF/, "")
        const lines = text.split(/\r\n|\n|\r/)

        const delimiter = this.autoDetectDelimiter ? this.#detectDelimiter(lines[0]) : this.format.delimiter
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