# CSV-module

## Description
This module is developed in a university course project at Linneus University, Sweden.

The intent of this module is to manage the reading and parsing of CSV-files(comma seperated values).
For example having an excell document containing rows and columns of values, this module help convert the strings of values to arrays for you to use in your own program. 


## How to use:

First clone the repo from github. Then copy the folder csv-module to the root of your project and import { CsvTable, CsvParser, CSVFormat } from './src/index.js'. 

## Example 

```javascript
const csv = `name,age,city
Alice,25,Stockholm
Bob,30,Gothenburg`

const table = CsvTable.fromCSV(csv)
console.log(table.getHeaders()) // ['name', 'age', 'city']
console.log(table.getRowCount()) // 2
```

**Get data from the table:**
```javascript
// Get cell by index
const name = table.getCell(0, 0) // 'Alice'

// Get cell by header name
const age = table.getCellByHeader(0, 'age') // '25'
```

**Select specific columns:**
```javascript
const selected = table.selectColumns(['name', 'city'])
```

### Create table manually:
```javascript
const table = new CsvTable(
  ['name', 'age'],
  [['Alice', '25'], ['Bob', '30']]
)
```
MIT License

Copyright (c) 2025 [Tobias Max]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
