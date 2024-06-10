const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentAPI = require("./../src/textProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorAPI", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();
    expect(result).to.be.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();
    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),

      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });
  it("#divideTextIntoColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),

      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];
    const result = new TextProcessorFluentAPI(content).divideTextInColumns().build();
    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],

      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo. ",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });
  it("#removeEmptyCharacters", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],

      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo. ",
      ],
    ];
    const result = new TextProcessorFluentAPI(content).removeEmptyCharacters().build();
    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],

      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];
    expect(result).to.be.deep.equal(expected);
  });
  it("#mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],

      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];
    const result = new TextProcessorFluentAPI(content).mapPerson().build();
    const expected = [
      {
        name: "Xuxa da Silva",
        citizenship: "Brasileira",
        civilStatus: "Casada",
        cpf: "23574342012",
        street: "Rua dos bobos",
        number: "zero",
        neighborhood: "Alphaville",
        city: "São Paulo",
      },
      {
        name: "Júlia Menezes",
        citizenship: "Brasileira",
        civilStatus: "Solteira",
        cpf: "29794780081",
        street: "Av. dos Estados",
        number: "99",
        neighborhood: "Jardins",
        city: "São Paulo",
      },
    ];
    expect(result).to.be.deep.equal(expected);
  });
});
