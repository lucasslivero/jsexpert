const { createSandbox } = require("sinon");
const assert = require("assert")
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();

;(async () => {
  
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    for (const sequence of fibonacci.execute(5)) {}
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)
    const expectedArgs = [3, 1, 2]
    assert.deepStrictEqual(args, expectedArgs, "Arrays not equal")
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    const results = [...fibonacci.execute(5)]
    const expectedResult = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResult, "Arrays not equal")

  }

})()