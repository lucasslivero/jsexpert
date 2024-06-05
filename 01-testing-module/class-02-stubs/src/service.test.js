const Service = require("./service");
const assert = require("assert");
const BASE_URL = "https://swapi.dev/api/planets"
const URL_TATOOINE = `${BASE_URL}/1`
const URL_ALDERAAN = `${BASE_URL}/2`
const { createSandbox } = require("sinon")
const sinon = createSandbox()
const mocks = {
  alderaan: require("./../mocks/alderaan.json"),
  tatooine: require("./../mocks/tatooine.json")
}
;(async () => {

  // Variables created in this block are only valid in the execution context
  const service = new Service()
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )
  stub.withArgs(URL_TATOOINE).resolves(mocks.tatooine)
  stub.withArgs(URL_ALDERAAN).resolves(mocks.alderaan)
  
  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearIn: 5
    }

    const results = await service.getPlanets(URL_TATOOINE)
    assert.deepStrictEqual(results, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearIn: 2
    }

    const results = await service.getPlanets(URL_ALDERAAN)
    assert.deepStrictEqual(results, expected)
  }

 })()