console.assert(String(123) === "123", "explicit conversion to string")
console.assert(123 + "" === "123", "implicit conversion to string")

console.assert(("hello" || 123) === "hello", "|| returns the first element if its value is true")
console.assert(("hello" && 123) === 123, "&& returns the first element if its value is false")


const item = {
  name: "Lucas Livero",
  age: 27,
  // String Conversion call it, if returns non-primitive call valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // Number Conversion call it, if returns non-primitive call toString
  valueOf() {
    return this.age
  },
  // High Priority
  [Symbol.toPrimitive](coercionType) {
    // console.log("Trying to convert to", coercionType)
    const types = {
      string: JSON.stringify(this),
      number: this.age,
      default: JSON.stringify(this),
    }
    return types[coercionType]
  }
}

// console.log("toString", String(item))
// console.log("valueOf", Number(item))
// console.log("default", new Date(item))

console.assert(item + 0 === `${JSON.stringify(item)}0`)
console.assert(!!item)
console.assert("Ae".concat(item) === `Ae${JSON.stringify(item)}`)
console.assert(item == String(item))

const item2 = { ...item, name: "Luc", age: 1 }
console.assert(item2.name === "Luc" && item2.age === 1)