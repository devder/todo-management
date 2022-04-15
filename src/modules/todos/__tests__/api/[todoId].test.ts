/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import todoId from "../../../../pages/api/todos/[todoId]";
import { ITodo } from "modules/todos/interfaces";

describe("/api/todos/[todoId] API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "GET", todoId: string, updatedTodo?: ITodo) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { updatedTodo };
    req.query = { todoId };
    return { req, res };
  }

  it("should return a 400 if todo was not found", async () => {
    const { req, res } = mockRequestResponse("PUT", "ef5a68b7");
    await todoId(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.statusMessage).toEqual("OK");
  });

  // ========================= YOU NEED A REAL ID TO RUN THIS TEST =======================================
  // ========================= or create mock data =======================================

  // it("should return a successful response if todo was found", async () => {
  //   const { req, res } = mockRequestResponse("GET", "ef5a68b7-431f-46df-9b47-8bd066aac3f7");
  //   await todoId(req, res);

  //   expect(res.statusCode).toBe(200);
  //   expect(res.statusMessage).toEqual("OK");
  // });

  // it("should return a 201 if todo was successfully updated", async () => {
  //   const { req, res } = mockRequestResponse("PUT", "ef5a68b7-431f-46df-9b47-8bd066aac3f7", {
  //     id: "ef5a68b7-431f-46df-9b47-8bd066aac3f7",
  //     content: "updated todo content",
  //     dueDate: "2022-04-15T05:55:02.425Z",
  //     status: "done",
  //   }); // Updated todo

  //   await todoId(req, res);
  //   expect(res.statusCode).toBe(201);
  // });

  it("should return a 405 if HTTP method is not PUT || GET", async () => {
    const { req, res } = mockRequestResponse("DELETE", "ef5a68b7"); // Invalid HTTP call

    await todoId(req, res);

    expect(res.statusCode).toBe(405);
  });
});

export {};
