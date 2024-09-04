import { Duplex, Transform } from "stream";

let count = 0;
const duplex = new Duplex({
  objectMode: true, // doesn't transform to buffer, increase memory usage
  encoding: "utf-8",
  read() {
    const everSecond = (intervalId) => {
      if (count++ <= 5) {
        this.push(`My name is Lucas - ${count}`);
        return;
      }
      clearInterval(intervalId);
      this.push(null);
    };
    setInterval(function () {
      everSecond(this);
    });
  },
  write(chunk, encoding, cb) {
    console.log(`[writable] saving `, chunk);
    cb();
  },
});

const transform = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

// Transform stream is also a Duplex stream but use the same communication chanel
transform.write("[transform] hello from write !");
// the push method will ignore the transform function
transform.push("[transform] hello from push !\n");

duplex.write("[duplex] hey this is a writable !\n");
duplex.push("[duplex] hey this is also a readable !\n");

// duplex.pipe(process.stdout);
// OR
// duplex.on("data", (msg) => console.log("data", msg));
// OR -> Redirect all data from readable to writable on duplex chanel
duplex.pipe(transform).pipe(duplex);
