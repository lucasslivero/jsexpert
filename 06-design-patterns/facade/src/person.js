const { evaluateRegex } = require("./util");

class Person {
  //(\w+):\s.* -> Search
  // $1, -> Replace
  constructor([name, citizenship, civilStatus, cpf, street, number, neighborhood, city]) {
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-z ]+$)/g);
    const formatFirstLetter = (value) => {
      return value.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    };
    const onlyNumbers = /\D/g;
    this.name = name;
    this.citizenship = formatFirstLetter(citizenship);
    this.civilStatus = formatFirstLetter(civilStatus);
    this.cpf = cpf.replace(evaluateRegex(onlyNumbers), "");
    this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/), "").join();
    this.number = number;
    this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/), "").join();
    this.city = city.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;
