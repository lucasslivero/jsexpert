import assert from 'assert'

const myMap = new Map()

myMap.set(1, 'one').set('Lucas', 123).set(true, () => 'Hello')

const mapConstructor = new Map([
  ['one', 1],
  [123, 'Lucas'],
  [false, () => 'Bool']
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Lucas'), 123)
assert.deepStrictEqual(myMap.get(true)(), 'Hello')

// Objects the keys can be only Strings or Symbols
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Lucas Livero'})

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Lucas Livero'})

// Utilities
// Object have Object.keys({ id: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// Verify an item exist
// Object use ({ id: 1 }).hasOwnProperty('id')
// Or can be used with if = if (item.id) => Coerçao implicita para boolean
assert.ok(myMap.has(onlyReferenceWorks))

// Remove item
// Object use => delete item.id
// imperfomatico para o javascript usar o delete
assert.ok(myMap.delete(onlyReferenceWorks))

// Os Objects nao da para iterar diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'], ['Lucas', 123], [true, () => 'Hello']]))

// for (const [key, value] of myMap) {
//   console.log({ key, value})
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() => '[Object, Object]'
// ({ toString: () => 'Hey'}).toString() === 'Hey'

// Qualquer chave pode colidir, com as propriedades herdadads do Object
// como constructor, toString, valueOf e etc.

const actor = {
  name: 'Lucas Livero',
  toString: 'King: Lucas'
}

// Nao tem restricao de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual(Array.from(myMap.keys()), [])

// Weak Map

// Pode ser coletado apos perder as referencias
// usado em casos bem especificas

// tem a maioria dos beneficios do Map mas nao e iteravel
// So chaves de referencia e que voce ja conheça
// mais leve e previni leak de memoria pq depois que as instancias saem da memoria, tudo é limpo
const weakMap = new WeakMap()
const hero = { name: 'Hulk' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.has(hero)
weakMap.delete(hero)
