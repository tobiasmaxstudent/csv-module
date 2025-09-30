/**
 * Stringifies the array
 */
export function stringifyCSV(data, options = {}) {
    const delimiter = options.delimiter ?? ','
    const charInQuotes = options.charInQuotes ?? '"'
    const newLine = options.newLine ?? '\n'
    const alwaysQuote = options.alwaysQuote ?? false
    const trailingNewLine = options.trailingNewLine ?? false
    const nullAsEmpty = options.nullAsEmpty ?? false

    if (typeof delimiter !== 'string' || delimiter.length !== 1) {
        throw new TypeError('Delimiter must be a single character string')
    }
    if (typeof charInQuotes !== 'string' || charInQuotes.length !== 1) {
        throw new TypeError('Quote character must be a single character string')
    }
    if (newLine !== '\n' && newLine !== '\r\n') {
        throw new TypeError('New line must be either \\n or \\r\\n')
    }
    if (!Array.isArray(data) || (data.length > 0 && !data.every(Array.isArray))) {
        throw new TypeError('Data must be an array of rows')
    }

    const escapeField = (fieldText) => fieldText.replaceAll(charInQuotes, charInQuotes + charInQuotes)
    const needsQuoting = (fieldText) => alwaysQuote || fieldText.includes(delimiter) || fieldText.includes(charInQuotes) || fieldText.includes('\n') || fieldText.includes('\r')
    const rows = data.map(row => {
    return row.map(cell => {
  const cellText = cell == null ? (nullAsEmpty ? '' : String(cell)) : String(cell);
  const body = escapeField(cellText);
  return needsQuoting(cellText) ? charInQuotes + body + charInQuotes : body;
}).join(delimiter)
  })

  const out = rows.join(newLine)
  return trailingNewLine ? out + newLine : out
}
