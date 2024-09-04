import http from "http";
import { Readable } from "stream";

function api1(request, response) {
  // request.write("test01\n");
  // request.write("test02\n");
  // request.write("test03\n");

  // request.pipe(response);

  let count = 0;
  const maxItems = 99;
  const readable = new Readable({
    read() {
      const everySecond = (intervalId) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: crypto.randomUUID(),
              name: `Item-${count}`,
            }) + "\n"
          );
          return;
        }
        clearInterval(intervalId);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      });
    },
  });
  readable.pipe(response);
}
function api2(request, response) {
  let count = 0;
  const maxItems = 99;
  const readable = new Readable({
    read() {
      const everySecond = (intervalId) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: crypto.randomUUID(),
              name: `Object-${count}`,
            }) + "\n"
          );
          return;
        }
        clearInterval(intervalId);
        this.push(null);
      };

      setInterval(function () {
        everySecond(this);
      });
    },
  });
  readable.pipe(response);
}

http.createServer(api1).listen(3000, () => console.log("server running at http://localhost:3000"));
http.createServer(api2).listen(4000, () => console.log("server running at http://localhost:4000"));
