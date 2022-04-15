/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import newTodo from "../new-todo";

describe("/api/todos/new-todo API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "POST", todoContent: string = "new todo content") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { todoContent };
    return { req, res };
  }

  it("should return a successful response after creating todo", async () => {
    const { req, res } = mockRequestResponse();
    await newTodo(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.statusMessage).toEqual("OK");
  });

  it("should return a 400 if todoContent is empty", async () => {
    const { req, res } = mockRequestResponse("POST", ""); // Empty todo

    await newTodo(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("should return a 405 if HTTP method is not POST", async () => {
    const { req, res } = mockRequestResponse("GET"); // Invalid HTTP call

    await newTodo(req, res);

    expect(res.statusCode).toBe(405);
  });
});

export {};
