import { CsvTable } from '../src/csvTable.js'

test('fromCSV med headers', () => {
  const t = CsvTable.fromCSV('id,name\n1,Ada\n2,Linus', { headers: true })
  expect(t.getHeaders()).toEqual(['id','name'])
  expect(t.getRowCount()).toBe(2)
  expect(t.getByHeader(1, 'name')).toBe('Linus')
})

test('toCSV roundtrip', () => {
  const t = new CsvTable(['a','b'], [['1','x'], ['2','y']])
  const out = t.toCSV()
  const t2 = CsvTable.fromCSV(out, { headers: true })
  expect(t2.getRows()).toEqual([['1','x'], ['2','y']])
})

test('selectColumns plockar ut och behåller ordning', () => {
  const t = new CsvTable(['id','name','age'], [['1','Ada','29'], ['2','Linus','42']])
  const s = t.selectColumns(['age','id'])
  expect(s.getHeaders()).toEqual(['age','id'])
  expect(s.getRows()).toEqual([['29','1'], ['42','2']])
})

test('map transformerar rader och validerar längd', () => {
  const t = new CsvTable(['a','b'], [['1','2']])
  const t2 = t.map(row => [row[0], String(Number(row[1]) * 2)])
  expect(t2.getRows()).toEqual([['1','4']])
})

test('map kastar fel om mapper inte returnerar array', () => {
  const t = new CsvTable(['a','b'], [['1','2']])
  expect(() => t.map(() => 'nope')).toThrow(TypeError)
})

test('getCell indexkontroll', () => {
  const t = new CsvTable(['a'], [['x']])
  expect(() => t.getCell(1,0)).toThrow('Index out of bounds')
  expect(() => t.getCell(0,5)).toThrow('Index out of bounds')
})
