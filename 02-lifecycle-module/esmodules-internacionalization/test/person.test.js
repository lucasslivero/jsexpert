import chai from "chai";
import mocha from "mocha";
import Person from "../src/person.js";

const { describe, it } = mocha
const { expect } = chai

describe("Person", () => {
  it("Should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString("1 Bike,Car 200 2020-05-05 2021-02-29")
    const expected = {
      id: 1,
      traveled: "200",
      vehicles: ["Bike", "Car"],
      from: "2020-05-05",
      to: "2021-02-29"
    }
    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
        from: '2020-01-01',
        to: '2020-02-01',
        vehicles: ['Bike', 'Carro'],
        traveled: "20000",
        id: '1'
    })
    const result = person.formatted("pt-BR")
    
    const expected = {
        id: 1,
        vehicles: 'Bike e Carro',
        traveled: '20.000 km',
        from: '01 de janeiro de 2020',
        to: '01 de fevereiro de 2020'
    }

    expect(result).to.be.deep.equal(expected)
})
})