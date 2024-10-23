import { appendFile } from "fs/promises";
import { createServer } from "http";

export function initializeServer() {
  async function handler(request, response) {
    await appendFile("./log.txt", `processed by ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, (_) => Math.floor(Math.random() * 40)).reduce(
      (prev, next) => prev + next,
      0
    );

    response.end(result.toString());
  }

  createServer(handler).listen(3000, () => console.log(`running at 3000 and pid ${process.pid}`));
}
