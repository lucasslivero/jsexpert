import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { Server } from "http";
import { InjectHttpInterceptor } from "../src/agent.js";
const originalHttp = jest.createMockFromModule("http");

describe("Http Interceptor agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });
  test("Should activate header Interceptor", () => {
    InjectHttpInterceptor();
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith("X-Instrumented-By", "Lucas Livero");
  });
});
