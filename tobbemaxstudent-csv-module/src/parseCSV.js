/**
 * Parses CSV data into an array of rows and columns.
 * @param {*} data - The CSV data to parse.
 * @param {*} options - Options for parsing the CSV.
 * @returns {Array<Array<string>>} - The parsed CSV data.
 */
export function parseCSV(data, options = {}) {
const delimiter = options.delimiter ?? ','
const charInQuotes = options.charInQuotes ?? '"'
const trim = options.trim ?? false

if (typeof delimiter !== 'string' || delimiter.length !== 1) {
    throw new TypeError('Delimiter must be a single character string')
}
if (typeof charInQuotes !== 'string' || charInQuotes.length !== 1) {
    throw new TypeError('Quote character must be a single character string')
}

const  isQuote = (char) => char === charInQuotes
const isDelimiter = (char) => char === delimiter

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
const text = String(data??'')
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
}
