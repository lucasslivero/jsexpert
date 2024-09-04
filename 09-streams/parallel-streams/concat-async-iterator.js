import axios from "axios";
import { pipeline } from "stream/promises";

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

//Writable Stream
async function* output(stream) {
  for await (const chunk of stream) {
    const name = chunk.match(/name":"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${chunk}`);
  }
}

// passthrough Stream
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding("utf-8");
    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line;
      }
    }
  }
}

await pipeline(merge(results), output);
