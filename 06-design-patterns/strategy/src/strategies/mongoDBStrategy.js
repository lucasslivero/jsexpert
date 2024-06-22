import { MongoClient } from "mongodb";

export default class MongoDBStrategy {
  #instance;
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString);
    this.connectionString = connectionString.replace(dbName, "");

    this.dbName = dbName.replace(/\W/, "");
    this.collection = "warrios";
  }

  async connect() {
    const client = new MongoClient(this.connectionString);
    await client.connect();
    const db = client.db(this.dbName).collection(this.collection);
    this.#instance = db;
  }

  async create(items) {
    return this.#instance.insertOne(items);
  }

  async read() {
    return this.#instance.find().toArray();
  }
}
