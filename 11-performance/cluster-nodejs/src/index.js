import cluster from "cluster";
import os from "os";
import { initializeServer } from "./server.js";

(() => {
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }
  const cpusNumber = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${cpusNumber} CPU`);

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();
