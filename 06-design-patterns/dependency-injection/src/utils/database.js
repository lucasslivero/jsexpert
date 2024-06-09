class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async connect() {
    await this.sleep(100);
    return this;
  }

  async find() {
    await this.sleep(100);
    return [{ name: "Lucas Livero" }];
  }
}

module.exports = { Database };
