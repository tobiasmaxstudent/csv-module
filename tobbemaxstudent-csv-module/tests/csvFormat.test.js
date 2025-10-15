import { CSVFormat } from "../src/csvFormat";

test('correct delimiter and quote', () => {
    const fmt = new CSVFormat({ delimiter: ';', quote: "'" })
    expect(fmt.delimiter).toBe(';')
    expect(fmt.quote).toBe("'")
})

test('invalid delimiter throws', () => {
    expect(() => new CSVFormat({ delimiter: ';;' })).toThrow('Delimiter must be a single character string')
    expect(() => new CSVFormat({ delimiter: '' })).toThrow('Delimiter must be a single character string')
    expect(() => new CSVFormat({ delimiter: 5 })).toThrow('Delimiter must be a single character string')
})
test('defaults', () => {
  const f = new CSVFormat()
  expect(f.delimiter).toBe(',')
  expect(f.quote).toBe('"')
  expect(f.newline).toBe('\n')
})
expect(() => new CSVFormat({ delimiter: '"', quote: '"' }))
  .toThrow('Delimiter and quote character cannot be the same')

  expect(() => new CSVFormat({ newline: '\r' }))
  .toThrow("New line must be either \\n or \\r\\n")
