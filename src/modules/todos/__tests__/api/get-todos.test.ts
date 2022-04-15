/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import getAllTodos from "../../../../pages/api/todos";

describe("/api/todos/index API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "GET") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    return { req, res };
  }

  it("should retrieve all todos successfully", async () => {
    const { req, res } = mockRequestResponse();
    await getAllTodos(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toEqual("OK");
  });

  it("should return a 405 if HTTP method is not GET", async () => {
    const { req, res } = mockRequestResponse("PUT"); // Invalid HTTP call

    await getAllTodos(req, res);

    expect(res.statusCode).toBe(405);
  });
});

export {};
