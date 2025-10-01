import { parseCSV } from '../src/parseCSV.js'

describe('parseCSV', () => {
  test('basic: två rader, komma-separerad', () => {
    const input = 'a,b\n1,2'
    expect(parseCSV(input)).toEqual([['a','b'], ['1','2']])
  })

    test('hanterar olika radslut', () => {
    const input = 'a,b\r\n1,2\r3,4\n5,6'
    expect(parseCSV(input)).toEqual([['a','b'], ['1','2'], ['3','4'], ['5','6']])
  })

  test('hanterar fält med citattecken', () => {
    const input = 'a,"b,b"\n1,"2""2"'
    expect(parseCSV(input)).toEqual([['a','b,b'], ['1','2"2']])
  })
})
test('sista rad utan newline inkluderas', () => {
  const input = 'a,b\n1,2\n3,4' // ingen newline sist
  expect(parseCSV(input)).toEqual([['a','b'], ['1','2'], ['3','4']])
})

test('tomma fält och trailing delimiter', () => {
  const input = 'a,b,c\n1,,3\na,b,'
  expect(parseCSV(input)).toEqual([['a','b','c'], ['1','','3'], ['a','b','']])
})

test('trim: bara okapslade fält trimmas', () => {
  const input = 'a,b\n  1  ,  " 2 "  '
  expect(parseCSV(input, { trim: true })).toEqual([['a','b'], ['1',' 2 ']])
})

test('enbart CR (\\r) radslut hanteras', () => {
  const input = 'a,b\r1,2\r3,4'
  expect(parseCSV(input)).toEqual([['a','b'], ['1','2'], ['3','4']])
})

test('custom delimiter och quoteChar', () => {
  const input = "ab\r\n'12'3"
  expect(parseCSV(input, { delimiter: '', charInQuotes: "'" }))
    .toEqual([['a','b'], ['12','3']])
})
