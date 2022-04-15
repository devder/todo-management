/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import getUser from "../get-user";

describe("/api/auth/get-user API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "GET") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    return { req, res };
  }

  it("returns 401 if user is unauthenticated", async () => {
    const { req, res } = mockRequestResponse();
    await getUser(req, res);

    expect(res.statusCode).toBe(401);
  });

  it("returns a 405 if http method is not GET", async () => {
    const { req, res } = mockRequestResponse("POST"); // Invalid HTTP call
    await getUser(req, res);

    expect(res.statusCode).toBe(405);
  });
});

export {};
