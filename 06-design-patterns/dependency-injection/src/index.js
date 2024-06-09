const { UserFactory } = require("./factories/userFactory.js");

(async () => {
  const userFactory = await UserFactory.createInstance();
  const result = await userFactory.find({ name: "Lucas%" });
  console.log(result);
})();
