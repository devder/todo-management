/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import signOut from "../sign-out";

describe("/api/auth/sign-out API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "GET") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    return { req, res };
  }

  it("clears the cookie after signing out", async () => {
    const { req, res } = mockRequestResponse("POST"); // Invalid Params
    await signOut(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader("Set-Cookie")).toEqual("sid=; Max-Age=-1; Path=/");
  });

  it("returns a 200 on all request", async () => {
    const { req, res } = mockRequestResponse("POST"); // Random HTTP call
    await signOut(req, res);

    expect(res.statusCode).toBe(200);
  });
});

export {};
