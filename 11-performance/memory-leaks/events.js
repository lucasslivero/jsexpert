import { randomBytes } from "crypto";
import Events from "events";
import { createServer } from "http";

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

function onData() {
  getBytes();
  const items = [];
  setInterval(function myInterval() {
    items.push(Date.now());
  });
}

myEvent.on("data", onData);

createServer(function handler(request, response) {
  myEvent.emit("data", Date.now());
  response.end("ok");
}).listen(3000, () => console.log("\nrunning at 3000"));
