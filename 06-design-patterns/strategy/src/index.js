import ContextStrategy from "./base/contextStrategy.js";
import MongoDBStrategy from "./strategies/mongoDBStrategy.js";
import PostgresDBStrategy from "./strategies/postgresDBStrategy.js";

const postgresConnectionString = "postgresql://postgres:root@localhost:5432/jsexpert?schema=public";
const postgresContext = new ContextStrategy(new PostgresDBStrategy(postgresConnectionString));
await postgresContext.connect();
const mongoConnectionString = "mongodb://mongodb:root@localhost:27017/jsexpert";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoConnectionString));
await mongoDBContext.connect();

const data = [
  {
    name: "Lucas Livero",
    type: "transaction",
  },
  {
    name: "Bob Marley",
    type: "activityLog",
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { name, type } of data) {
  const context = contextTypes[type];

  await context.create({ name: name + Date.now() });
  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}

// console.log("Postgres");
// await postgresContext.create(data.map((item) => ({ name: item.name })));
// console.log(await postgresContext.read());
// console.log("MongoDB");
// await mongoDBContext.create(data);
// console.log(await mongoDBContext.read());
