import assert from 'assert'

// usado na maioria das vezes para listas de items unicos
const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))
// console.log('Set with add item per item', set)

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

// console.log('set.keys', set.keys())
// console.log('set.values', set.values())

// no Array comum para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has('3'))

// Mesma teoria do Map, mas voce sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item está ou não no array.

// tem nos dois arrays
const users1 = new Set([
  'lucas',
  'liz',
  'kesya'
])

const users2 = new Set([
  'lucas',
  'jose',
  'maria'
])

const intersection = new Set([...users1].filter(user => users2.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['lucas'])

const difference = new Set([...users1].filter(user => !users2.has(user)))
assert.deepStrictEqual(Array.from(difference), ['liz', 'kesya'])

// WeakSet
// Mesma ideia weakMap
// nao é enumeravel (iteravel)
// so trabalha com chaves como referencia
// so tem metodos simples

const user1 = { id: 1 }
const user2 = { id: 2 }

const weakSet = new WeakSet([ user1 ])
weakSet.add(user2)
weakSet.delete(user1)
weakSet.has(user1)
