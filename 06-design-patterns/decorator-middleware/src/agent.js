import http from "http";

export async function InjectHttpInterceptor() {
  const emit = http.Server.prototype.emit;
  http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args;

    if (type === "request") {
      response.setHeader("X-Instrumented-By", "Lucas Livero");
    }

    return emit.apply(this, args);
  };
}
