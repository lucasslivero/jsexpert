import knex from "knex";

export default class PostgresDBStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.table = "warrios";
  }

  async connect() {
    this.#instance = knex({
      client: "pg",
      connection: this.connectionString,
    });

    return this.#instance.raw("SELECT 1+1 AS result");
  }

  async create(item) {
    return this.#instance.insert(item).into(this.table);
  }

  async read() {
    return this.#instance.select().from(this.table);
  }
}
