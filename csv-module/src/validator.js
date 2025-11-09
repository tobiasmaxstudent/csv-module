export class Validator {
    
    validateHeaders(headers) {
        if (!Array.isArray(headers)) {
            throw new TypeError('Headers must be an array')
        }
        const seen = new Set()
        for (const header of headers) {
            if (typeof header !== 'string') {
                throw new TypeError('All headers must be strings')
            }
            if (seen.has(header)) {
                throw new TypeError(`Duplicate header: ${header}`)
            }
            seen.add(header)
        }
        return headers.slice()
    }
    validateRow(row, expectedLength) {
        if (!Array.isArray(row)) {
            throw new TypeError('Row must be an array')
        }
        if (row.length !== expectedLength) {
            throw new TypeError(`Row has length ${row.length}, expected ${expectedLength}`)
        }
        return row.slice()
    }
    validateTableInput(headers, rows) {
        const headersCopy = this.validateHeaders(headers)
        if (!Array.isArray(rows)) {
            throw new TypeError('Rows must be an array of arrays')
        }
        const expectedLength = headersCopy.length
        const rowsCopy = rows.map((row, rowIndex) => {
            try {
                return this.validateRow(row, expectedLength)
            } catch (e) {
                throw new TypeError(`Error in row ${rowIndex}: ${e.message}`)
            }
        })
        return {headersCopy, rowsCopy }
    }
}
