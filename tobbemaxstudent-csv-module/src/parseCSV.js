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
        return this.format.delimiter
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


/* 







    const newLineSpan = (text, i) => {
        const char = text[i]
        if (char === '\n') return 1
        if (char === '\r') return text[i + 1] === '\n' ? 2 : 1
        return 0
    }

    const rows = []
    let currentRow = []
let field = ''
let inQuotes = false
let fieldInQuotes = false // If the value is in double quotes "he said "hello""

const pushField = () => {
    const value = trim && !fieldInQuotes ? field.trim() : field
    currentRow.push(value)
    field = ''
    fieldInQuotes = false
}

const pushRow = () => {
    rows.push(currentRow)
    currentRow = []
}

const text = String(data ?? '')
let i = 0
const handleInsideQuotes = (text, i) => {
    const char = text[i]
    if (char !== charInQuotes) {
        field += char
        return i + 1
    }
    if (text[i + 1] === charInQuotes) {
        field += charInQuotes
        return i + 2
    }
    inQuotes = false
    return i + 1
}

const handleOutsideQuotes = (text, i) => {
    const char = text[i]
    if (field === '' && (char === ' ' || char === '\t')) { //Gör till variable \t
        let j = i + 1
        while (j < text.length && (text[j] === ' ' || text[j] === '\t')) {
            j++
        }
        if (text[j] === charInQuotes) {
            return i + 1 //Otydligt vad i är
        }
    }
    if (fieldInQuotes && (char === ' ' || char === '\t')) {
        return i + 1
    }
    if (isQuote(char)) {
        inQuotes = true
        fieldInQuotes = true
        return i + 1
    }
    if (isDelimiter(char)) {
        pushField()
        return i + 1
    }
    const span = newLineSpan(text, i)
    if (span) {
        pushField()
        pushRow()
        return i + span
    }
    field += char
    return i + 1
}

while (i < text.length) {
    i = inQuotes
        ? handleInsideQuotes(text, i)
        : handleOutsideQuotes(text, i)
}

pushField()
if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
    pushRow()
}
return rows
    } */
