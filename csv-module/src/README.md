# CSV-module

## Description
This module is developed in a university course project at Linneus University, Sweden.

The intent of this module is to manage the reading and parsing of CSV-files(comma separated values).
For example having an excel document containing rows and columns of values, this module helps convert the strings of values to arrays for you to use in your own program. 


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
## License
MIT License - See LICENSE file for details