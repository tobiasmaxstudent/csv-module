/**
 * Parses CSV data into an array of rows and columns.
 * @param {*} data - The CSV data to parse.
 * @param {*} options - Options for parsing the CSV.
 * @returns {Array<Array<string>>} - The parsed CSV data.
 */
export function parseCSV(data, options = {}) {
const delimiter = options.delimiter ?? ','
const quoteChar = options.quoteChar ?? '"'
const trim = options.trim ?? false

if (typeof delimiter !== 'string' || delimiter.length !== 1) {
    throw new TypeError('Delimiter must be a single character string')
}
if (typeof quoteChar !== 'string' || quoteChar.length !== 1) {
    throw new TypeError('Quote character must be a single character string')
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

while (i < text.length) {
    const char = text[i]

    if (inQuotes) {
        if (char === quoteChar) {
            if (text[i + 1] === quoteChar) {
                field += quoteChar
                i += 2; 
                continue
            }
            inQuotes = false
            i++;
            continue
        }
        field += char 
        i++
        continue
    }
        if (char === quoteChar) {
            inQuotes = true
            fieldInQuotes = true
            i++
            continue
        }
        if (char === delimiter) {
            pushField()
            i++
            continue
        }
        if (char === '\n' || char === '\r') {
            pushField()
            pushRow()
            if (char === '\r' && text[i + 1] === '\n') {
                i++ // skip \n in \r\n
            }
            i++
            continue
        }
        field += char
        i++
    }
    
    pushField()
    if (currentRow.length > 1 || currentRow.length === 1 && currentRow[0] !== '') {
        pushRow()
    }
    return rows
}

