/**
 * Rules for the format of a CSV file.
 * Delimiter, the character used to separate fields (default is comma).
 */
export class CSVFormat {
    constructor(options = {}) {
        const config = this.#createDefaultConfig(options)
        this.#validateConfig(config)
        this.#applyConfig(config)
    }
    #createDefaultConfig(options) {
        return {
            delimiter: options.delimiter ?? ',',
            quote: options.quote ?? '"',
            newline: options.newline ?? '\n',
            alwaysQuote: options.alwaysQuote ?? false,
            trailingNewline: options.trailingNewline ?? false,
            nullAsEmpty: options.nullAsEmpty ?? false,
            trimOutsideQuotes: options.trimOutsideQuotes ?? false,
            trimCells: options.trimCells ?? false,
        }
    }
    #validateConfig(config) {
        this.#validateSingleChar('Delimiter', config.delimiter)
        this.#validateSingleChar('Quote character', config.quote)
        this.#validateNewline(config.newline)
        this.#validateDelimiter(config.delimiter)
        this.#validateBooleans(config)
    }
     #applyConfig(config) {
        Object.assign(this, config)
    }
    #validateBooleans(config) {
        const booleanFields = ['alwaysQuote', 'trailingNewline', 'nullAsEmpty', 
                               'trimOutsideQuotes', 'trimCells']
        for (const field of booleanFields) {
            this.#validateBooleanOption(field, config[field])
        }
    }
    
    
    
    #validateSingleChar(name, value) {
        if (typeof value !== 'string' || value.length !== 1) {
            throw new TypeError(`${name} must be a single character string`)
        }
    }
    
    #validateDelimiter(delimiter) {
        const validDelimiter = [';', ',']
        if (!validDelimiter.includes(delimiter)) {
            throw new TypeError("The delimiter must be a , or ;")
        }
    }
    #validateNewline(newline) {
        const validNewlines = ['\n', '\r\n',]
        if (!validNewlines.includes(newline)) {
            throw new TypeError("New line must be either \\n or \\r\\n")
        }
    }
   
    #validateBooleanOption(name, value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(`${name} must be a boolean`)
        }
    }
}
