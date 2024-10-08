import axios from "axios";
import { PassThrough, Writable } from "stream";

const API1 = "http://localhost:3000";
const API2 = "http://localhost:4000";

const requests = await Promise.all([
  axios({
    method: "GET",
    url: API1,
    responseType: "stream",
  }),
  axios({
    method: "GET",
    url: API2,
    responseType: "stream",
  }),
]);

const results = requests.map(({ data }) => data);

const output = new Writable({
  write(chunk, enc, cb) {
    const data = chunk.toString().replace(/\n/, "");
    const name = data.match(/name":"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${data}`);
    cb();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false });
    current.on("end", () => items.every((s) => s.ended) && prev.end());
    return prev;
  }, new PassThrough());
}

merge(results).pipe(output);
