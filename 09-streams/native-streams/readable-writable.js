import { Readable, Writable } from "stream";

const readable = new Readable({
  read() {
    this.push("Hello World 1");
    this.push("Hello World 2");
    this.push("Hello World 3");
    this.push(null);
  },
});

const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

readable.pipe(writable);
// .pipe(process.stdout);
