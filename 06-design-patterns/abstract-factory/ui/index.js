import { DATABASE } from "../shared/data.js";

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  initialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? "browser" : "console";
  const { default: ViewFactory } = await import(`./../platforms/${path}/index.js`);
  const app = new Application(new ViewFactory());
  app.initialize(DATABASE);
})();
