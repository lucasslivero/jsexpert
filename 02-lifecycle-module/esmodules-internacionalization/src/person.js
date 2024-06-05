export default class Person {
  constructor({ id, vehicles, traveled, from, to}) {
    this.id = id
    this.vehicles = vehicles
    this.traveled = traveled
    this.from = from
    this.to = to
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split('-').map(Number)
      return new Date(year, (month - 1), day)
    }
    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(this.vehicles),
      traveled: new Intl.NumberFormat(language, { style: "unit", unit: "kilometer" }).format(this.traveled),
      from: new Intl.DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric" }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric" }).format(mapDate(this.to))
    }
  }

  static generateInstanceFromString(text) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, traveled, from, to] = text.split(EMPTY_SPACE)
    const person = new Person({
      id: Number(id),
      vehicles: vehicles.split(','),
      traveled,
      from,
      to
    })

    return person
  }
}