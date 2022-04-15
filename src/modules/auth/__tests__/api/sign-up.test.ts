/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import signup from "../../../../pages/api/auth/sign-up";
import { AuthProps } from "modules/auth/interfaces";

describe("/api/auth/sign-up API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "POST", authProps?: AuthProps) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { authProps };
    return { req, res };
  }

  it("returns a 400 on invalid params", async () => {
    const { req, res } = mockRequestResponse("POST", { username: "", password: "" }); // Invalid Params
    await signup(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("returns a 405 if HTTP method is not POST", async () => {
    const { req, res } = mockRequestResponse("PUT"); // Invalid HTTP call

    await signup(req, res);

    expect(res.statusCode).toBe(405);
  });

  it("returns a 400 if user already exists", async () => {
    const { req, res } = mockRequestResponse("POST", { username: "test-username", password: "test-password" });
    await signup(req, res);
    await signup(req, res);

    expect(res.statusCode).toBe(400);
  });

  // ============= NEED TO MANAGE THIS WITH DB ==============

  // it("returns a 201 on successful signup", async () => {
  //   const { req, res } = mockRequestResponse("POST", { username: "testUsername201", password: "testPassword" });
  //   await signup(req, res);

  //   expect(res.statusCode).toBe(201);
  //   expect(res.statusMessage).toEqual("OK");
  // });

  // it("sets a cookie after successful signup", async () => {
  //   const { req, res } = mockRequestResponse("POST", { username: "test-username2", password: "test-password2" });
  //   await signup(req, res);

  //   expect(res.statusCode).toBe(201);
  //   expect(res.getHeader("Set-Cookie")).toBeDefined();
  // });
});

export {};
