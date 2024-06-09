const { deepStrictEqual } = require("assert");
const rewiremock = require("rewiremock/node");
rewiremock.overrideEntryPoint(module); // this is important

const dbData = [{ name: "Lucas Livero" }, { name: "Bob Marley" }];
class MockData {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => require("./../src/utils/database.js")).with({ Database: MockData });

(async () => {
  {
    rewiremock.enable();
    const expected = [{ name: "LUCAS LIVERO" }, { name: "BOB MARLEY" }];
    const { UserFactory } = require("../src/factories/userFactory.js");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [{ name: "LUCAS LIVERO" }];
    const { UserFactory } = require("../src/factories/userFactory.js");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
