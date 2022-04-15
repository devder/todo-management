/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import deleteTodo from "../delete-todo";

describe("/api/todos/index API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "DELETE", todoId?: string) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { todoId };
    return { req, res };
  }

  it("should retrieve updated todos list", async () => {
    const { req, res } = mockRequestResponse("DELETE", "20d9893a-3a93-4bf8-b35e-ac57de18420b");
    await deleteTodo(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toEqual("OK");
  });

  it("should return a 405 if HTTP method is not DELETE", async () => {
    const { req, res } = mockRequestResponse("PUT"); // Invalid HTTP call

    await deleteTodo(req, res);

    expect(res.statusCode).toBe(405);
  });
});

export {};
