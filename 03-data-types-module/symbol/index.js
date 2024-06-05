import assert from 'assert'

const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = "value for normal Object"
user[uniqueKey] = "value for symbol"

// console.log("getting key", user.userName)
// console.log("getting key", user[Symbol("userName")])
// // sempre único em nivel de endereço de memoria
// console.log("getting key", user[uniqueKey])

assert.deepStrictEqual(user.userName, "value for normal Object")
assert.deepStrictEqual(user[Symbol("userName")], undefined)
// sempre único em nivel de endereço de memoria
assert.deepStrictEqual(user[uniqueKey], "value for symbol")

const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log("item:", item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol("kItems")
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") {
      throw new TypeError()
    }

    const items =  this[kItems].map(item => new Intl
      .DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric" })
      .format(item)
    )
    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(items)
  }
  get [Symbol.toStringTag]() {
    return "WHAT ?"
  }
}

const myDate = new MyDate([2020, 3, 1], [2018, 2, 2])

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT ?]')
// Symbol.toPrimitive - Number
assert.throws(() => myDate + 1, TypeError)
// Symbol.toPrimitive - String 
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

assert.deepStrictEqual([...myDate], expectedDates)

// ;(async () => {
//   for await (const item of myDate) {
//     console.log('Async Iterator', item)
//   }
// })()

const dates = []
for await (const date of myDate) { dates.push(date) }
const expectedDatesInISOString = expectedDates.map(item => item.toISOString())
assert.deepStrictEqual(dates, expectedDatesInISOString)