'use strict'

import assert from 'assert'

// grant objects semantic and security

// Apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// Issue that can happen
myObj.add.apply = function () { throw new TypeError('Vish') }
assert.throws(() => myObj.add.apply({}, []), { name: 'TypeError', message: 'Vish' })

// Reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

function myDate() { }

Object.defineProperty(myDate, 'withObject', { value: () => 'Hey There !' })
Reflect.defineProperty(myDate, 'withReflect', { value: () => 'Hey Baby !' })

assert.deepStrictEqual(myDate.withObject(), 'Hey There !')
assert.deepStrictEqual(myDate.withReflect(), 'Hey Baby !')

// Delete Property
const withDelete = { user: 'Lucas Livero' }
delete withDelete.user
assert.deepStrictEqual(withDelete, {})

const withReflect = { user: 'Lucas Livero' }
Reflect.deleteProperty(withReflect, "user")
assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false)

// Get
assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, "userName"), TypeError)

// has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, "batman"))

// ownKeys
const user = Symbol('user')
const otherObj = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'Lucas Livero',
}
const objectKeys = [
  ...Object.getOwnPropertyNames(otherObj),
  ...Object.getOwnPropertySymbols(otherObj)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
assert.deepStrictEqual(Reflect.ownKeys(otherObj), ['id', Symbol.for('password'), user])