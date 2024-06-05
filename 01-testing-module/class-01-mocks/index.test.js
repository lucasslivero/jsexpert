const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert")

;(async () => {

  // Variables created in this block are only valid in the execution context
  {
    const filePath = './mocks/empty-file-invalid.csv'
    const expected =  new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/header-invalid.csv'
    const expected =  new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/five-items-invalid.csv'
    const expected =  new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/three-items-valid.csv'
    const expected =  [
      {id: 1, name:"xuxa", profession: "developer", age: 120},
      {id: 2, name:"jose", profession: "manager", age: 45},
      {id: 3, name:"zezoin", profession: "QA", age: 26}
    ]
    const result = await File.csvToJSON(filePath)
    assert.deepEqual(result, expected)
  }
 })()