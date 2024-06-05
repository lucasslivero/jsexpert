const { readFile } = require('fs/promises')
const { error } = require("./constants");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}
class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, "utf-8")
    const [header, ...lines] = content.split(/\r?\n/)
    const validation = this.isValid(header, lines)
    if (!validation.valid) {
      throw new Error(validation.error)
    }
    return this.parseCSVToJSON(header, lines)
  }

  /** 
    * @param {Array<string>} header  
    * @param {Array<string>} lines  
    * */
  static isValid(header, lines, options = DEFAULT_OPTION) {
    const isHeaderValid = header === options.fields.join(",")
    if (!isHeaderValid) { 
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }
    if (!lines.length || lines.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return { valid: true }
  }

  /** 
  * @param {Array<string>} header  
  * @param {Array<string>} lines  
  * */
  static parseCSVToJSON(header, lines) {
    const headerMap = header.split(",")
    const users = lines.map(line => {
      const columns = line.split(",")
      const user = {}
      for (const index in columns) {
        user[headerMap[index]] = columns[index].trim()
      }
      return user
    })
    return users
  }
}

module.exports = File