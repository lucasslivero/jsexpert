'use strict'
import Event from 'events'
const event = new Event()

const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    return object[prop]
  }
})

setInterval(function () {
  proxy.counter += 1
  console.log('[3]: setInterval')
  if (proxy.counter === 10) {
    clearInterval(this)
  }
}, 1000)

setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: setTimeout')
}, 0)

// If want to execute now
setImmediate(() => {
  proxy.counter = 2
  console.log('[1]: setImmediate')
})

// execute now but ends with node lifecycle
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})