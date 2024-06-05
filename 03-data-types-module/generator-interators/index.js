import assert from 'assert'
import { readFile, readdir, stat } from 'fs/promises'
const { pathname: filename } = new URL("./index.js", import.meta.url)
const { pathname: dirname } = new URL(".", import.meta.url)

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello'
  yield *calculation(20, 10)
}

const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', 200])
assert.deepStrictEqual([...main()], ['Hello', 200])

/* Async Iterators */
function* promisified() {
  yield readFile(filename)
  yield Promise.resolve('Hey')
}

// Promise.all([...promisified()]).then(results => console.log('promisified', results))
// ;(async () => {
//   for await (const item of promisified()) {
//     console.log("for await", item.toString())
//   }
// })()

async function* systemInfo() {
  const file = await readFile(filename)
  yield { field: file.toString() }

  const { size } = await stat(filename)
  yield { size }

  const dir = await readdir(dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log("systemInfo", item)
  }
})()