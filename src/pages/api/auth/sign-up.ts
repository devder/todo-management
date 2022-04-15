import { AppResponse } from "app/lib/app-response";
import { ErrorCode } from "app/lib/error-code";
import { AuthProps } from "modules/auth/interfaces";
import { IUser } from "modules/auth/interfaces/IUser";
import { buildUser } from "modules/auth/utils/build-user";
import { SessionUtil } from "modules/auth/utils/session-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<IUser | null>>) {
  let response: AppResponse<IUser | null>;

  // Only allow POST requests
  if (req.method !== "POST") {
    response = {
      data: null,
      message: "Method not allowed",
      status: false,
    };

    res.status(405).json(response);
    return;
  }

  try {
    const authProps = req.body.authProps as AuthProps;

    const isValid =
      typeof authProps.username === "string" && authProps.username.length && typeof authProps.password === "string";

    if (!isValid) {
      throw new Error(ErrorCode.Forbidden);
    }

    const user = await buildUser(authProps);

    SessionUtil.setSession(res, user);

    response = {
      data: user,
      message: "User signed up",
      status: true,
    };
    res.status(201).json(response);
  } catch (error) {
    let errorCode = "";
    if (error instanceof Error) {
      errorCode = error.message;
    }

    let message = "Server Error";

    switch (errorCode) {
      case ErrorCode.AlreadyExists:
        message = "A user with that username already exists";
        break;
      case ErrorCode.Forbidden:
        message = "Invalid Params";
        break;
      default:
        break;
    }

    response = {
      data: null,
      message,
      status: false,
    };

    const statusCode = errorCode === ErrorCode.AlreadyExists || errorCode === ErrorCode.Forbidden ? 400 : 500;
    res.status(statusCode).json(response);
  }
}
