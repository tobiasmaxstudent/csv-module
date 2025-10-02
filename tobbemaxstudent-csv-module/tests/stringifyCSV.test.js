import { stringifyCSV } from '../src/stringifyCSV.js'

describe('stringifyCSV', () => {
  test('basic: två rader, komma-separerad', () => {
    const out = stringifyCSV([['a','b'], ['1','2']])
    expect(out).toBe('a,b\n1,2')
  })

  test('escapar citattecken med ""', () => {
    const out = stringifyCSV([['He said "hi"']])
    expect(out).toBe('"He said ""hi"""')
  })

  test('komma i fält kräver citat', () => {
    const out = stringifyCSV([['x,y', 'z']])
    expect(out).toBe('"x,y",z')
  })

  test('radbrytning i fält kräver citat', () => {
    const out = stringifyCSV([['a\nb', 'c']])
    expect(out).toBe('"a\nb",c')
  })

  test('CRLF som radslut', () => {
    const out = stringifyCSV([['a','b'], ['1','2']], { newLine: '\r\n' })
    expect(out).toBe('a,b\r\n1,2')
  })

  test('alwaysQuote: citera alla fält', () => {
    const out = stringifyCSV([['a','b'], ['1','2']], { alwaysQuote: true })
    expect(out).toBe('"a","b"\n"1","2"')
  })

  test('trailingNewLine: extra newline på slutet', () => {
    const out = stringifyCSV([['a','b'], ['1','2']], { trailingNewLine: true })
    expect(out).toBe('a,b\n1,2\n')
  })

  test('custom delimiter och quoteChar (semicolon + enkelcitat)', () => {
  const out = stringifyCSV([["Lars' car", 'ok']], { delimiter: ';', charInQuotes: "'" })
  expect(out).toBe("'Lars'' car';ok")
})

  test('null/undefined default (nullAsEmpty=false): skrivs som "null"/"undefined"', () => {
    const out = stringifyCSV([[null, undefined]])
    expect(out).toBe('null,undefined')
  })

  test('nullAsEmpty=true: null/undefined blir tomma fält', () => {
    const out = stringifyCSV([[null, undefined]], { nullAsEmpty: true })
    expect(out).toBe(',')
  })

  test('tom input-array ger tom sträng', () => {
    const out = stringifyCSV([])
    expect(out).toBe('')
  })

  test('fel: ogiltig delimiter (måste vara 1 tecken)', () => {
    expect(() => stringifyCSV([['a']], { delimiter: '||' })).toThrow(TypeError)
  })
})
test('fält som innehåller citattecknet måste citeras', () => {
  const out = stringifyCSV([['a"b']])
  expect(out).toBe('"a""b"')
})

test('nullAsEmpty=false: null/undefined blir "null"/"undefined"', () => {
  const out = stringifyCSV([[null, undefined]], { nullAsEmpty: false })
  expect(out).toBe('null,undefined')
})

test('tom rad hanteras', () => {
  const out = stringifyCSV([[]]) 
  expect(out).toBe('')
})

test('flera tomma rader', () => {
  const out = stringifyCSV([[], []])
  expect(out).toBe('\n')
})
