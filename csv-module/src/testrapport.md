# Test Report - CSV-Module

## Method
The module is tested with automatic unit tests with the Jest-framework. Every test case verifies certain functionallity or edge case. The tests are run with the command `npm test`. 



## Testresultat

| Whats been tested | How it's tested | Result |
|---|---|---|
| CSVFormat - Standard configuration | Verifying standard values to (delimiter: ',', quote: '"', newline: '\n') | ✅ PASS |
| CSVFormat - Custom configuration | Test cases with custom delimiter ';' and quote "'" | ✅ PASS |
| CSVFormat - Invalid  delimiters | Testing that only ',' and ';' are accepted, other values throws TypeError | ✅ PASS |
| CSVFormat - Invalid newline-character | Only accepts '\n' and '\r\n' as newline dividers | ✅ PASS |
| CSVFormat - Boolean-validation | All boolean options has to be boolean-type | ✅ PASS |
| CsvParser - Single comma separation CSV | Parses comma-separated CSV-text to  2D-array | ✅ PASS |
| CsvParser - Semicolon-separated CSV | Parses semicolon-separated CSV  | ✅ PASS |
| CsvParser - Empty string | Handles empty input ('') and returnes a empty array | ✅ PASS |
| CsvParser - Cell-trimning | Trimms whitespace from cells when trimCells is  true | ✅ PASS |
| CsvParser - Empty rows | Handles empty row correctly | ✅ PASS |
| CsvTable - Constructor with valid data | Creates a table with headers and  rows | ✅ PASS |
| CsvTable - getCell() with valid index | Gets correct cell after row and  column-index | ✅ PASS |
| CsvTable - getCellByHeader() | Gets cell by combining row-index and header-name | ✅ PASS |
| CsvTable - getRowCount() and getColumnCount() | Returns correct amount of  rows and columns | ✅ PASS |
| CsvTable - Index out of bounds | Throws TypeError when row or column index is out of bounds| ✅ PASS |
| CsvTable - Unknown column-name | Throws TypeError when getCellByHeader() gets unknown header-name | ✅ PASS |
| CsvTable - selectColumns() with unknown column | Throws TypeError when choosing non-exsisting column| ✅ PASS |
| CsvTable - fromCSV() with headers | Creates table from CSV-string where first rows are headers | ✅ PASS |
| CsvTable - fromCSV() without Headers | Auto-generates column1, column2 and so on as headers | ✅ PASS |
| Validator - validateHeaders() | Validates that headers is an array of unique strings | ✅ PASS |
| Validator - validateRow() | Validates that row is an array with correct length | ✅ PASS |
| Data immutabillity - getRows() returns copy | Changing the returned array does not affect the original table | ✅ PASS |

## Conclusion

**Total test cases:** 22  
**Passed:** 22
**Failed:** 0  
**Status:** ✅ All tests passed

The module works according to the specification. All public methods have been tested both with normal use cases and edge cases. Validation of input-data works as intended and throws exceptions when invalid inputs.

## Testmiljö

- **Test-framework:** Jest
- **Nodejs version:** 18+
- **Run tests:** `npm run test`