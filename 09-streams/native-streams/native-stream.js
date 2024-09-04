// process.stdin
//   .pipe(process.stdout)
//   .on("data", (msg) => console.log("data", msg.toString()))
//   .on("error", (msg) => console.log("error", msg.toString()))
//   .on("end", (_) => console.log("end"))
//   .on("close", (_) => console.log("close"));

// --- Chat ---
// Terminal 1
// node -e "require("net").createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// Terminal 2
// node -e "process.stdin.pipe(require("net").connect(1338))"

// --- Download File ---
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// curl localhost:3000 -o output.txt

import { createReadStream } from "fs";
import http from "http";

http
  .createServer((req, res) => {
    // doesn't work
    // const file = readFileSync("big.file").toString();
    // res.write(file);
    // res.end();

    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => console.log("running at http://localhost:3000"));
