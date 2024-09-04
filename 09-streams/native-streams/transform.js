import { createWriteStream } from "fs";
import { Readable, Transform, Writable } from "stream";

const readable = new Readable({
  read() {
    // for (let i = 0; i < 5; i++) {
    for (let i = 0; i < 1e6; i++) {
      const person = { id: crypto.randomUUID(), name: `lucas ${i}` };
      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null);
  },
});

const transform = new Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    cb(null, result);
  },
});

const mapHeaders = new Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    cb(null, "id,name\n".concat(chunk));
  },
});

const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

const pipeline = readable
  .pipe(transform)
  .pipe(mapHeaders)
  // .pipe(writable);
  // .pipe(process.stdout);
  .pipe(createWriteStream("data.csv"));

pipeline.on("end", () => console.log("Finish !"));
