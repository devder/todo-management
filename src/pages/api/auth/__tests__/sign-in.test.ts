/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import signIn from "../sign-in";
import { AuthProps } from "modules/auth/interfaces";

describe("/api/auth/sign-in API Endpoint", () => {
  function mockRequestResponse(method: RequestMethod = "POST", authProps?: AuthProps) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { authProps };
    return { req, res };
  }

  it("returns a 404 on invalid params", async () => {
    const { req, res } = mockRequestResponse("POST", { username: "", password: "" }); // Invalid Params
    await signIn(req, res);

    expect(res.statusCode).toBe(404);
  });

  it("returns a 405 if HTTP method is not POST", async () => {
    const { req, res } = mockRequestResponse("PUT"); // Invalid HTTP call

    await signIn(req, res);

    expect(res.statusCode).toBe(405);
  });

  //  ========================== NEED TO HAVE REGISTERED FIRST ======================================

  //  it("returns a 201 on successful signIn", async () => {
  //    const { req, res } = mockRequestResponse("POST", { username: "testUsername201", password: "testPassword" });
  //    await signIn(req, res);

  //    expect(res.statusCode).toBe(201);
  //    expect(res.statusMessage).toEqual("OK");
  //  });

  //  it("sets a cookie after successful signIn", async () => {
  //    const { req, res } = mockRequestResponse("POST", { username: "test-username2", password: "test-password2" });
  //    await signIn(req, res);

  //    expect(res.statusCode).toBe(201);
  //    expect(res.getHeader("Set-Cookie")).toBeDefined();
  //  });
});

export {};
