/**
 * Rules for the format of a CSV file.
 * Delimiter, the character used to separate fields (default is comma).
 */
export class CSVFormat {
    constructor(options = {}) {
        this.delimiter = options.delimiter ?? ','
        this.quote = options.quote ?? '"'
        this.newline = options.newline ?? '\n'
        this.alwaysQuote = options.alwaysQuote ?? false
        this.trailingNewline = options.trailingNewline ?? false
        this.nullAsEmpty = options.nullAsEmpty ?? false
        this.trimOutsideQuotes = options.trimOutsideQuotes ?? false
        this.#validateSingleChar('Delimiter', this.delimiter)
        this.#validateSingleChar('Quote character', this.quote)
        this.#validateNewline('New line', this.newline)
        this.#checkDelimiterIsNotQuote()
    }

    #validateSingleChar(name, value) {
        if (typeof value !== 'string' || value.length !== 1) {
            throw new TypeError(`${name} must be a single character string`)
        }
    }
    #validateNewline(name, value) {
        if (value !== '\n' && value !== '\r\n') {
            throw new TypeError(`${name} must be either \\n or \\r\\n`)
        }
}
    #checkDelimiterIsNotQuote() {
        if (this.delimiter === this.quote) {
            throw new TypeError('Delimiter and quote character cannot be the same')
        }
    }
}