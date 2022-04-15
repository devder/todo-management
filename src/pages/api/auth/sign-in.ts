import { AppResponse } from "app/lib/app-response";
import { ErrorCode } from "app/lib/error-code";
import { AuthProps } from "modules/auth/interfaces";
import { IUser } from "modules/auth/interfaces/IUser";
import { SessionUtil } from "modules/auth/utils/session-util";
import { validateUser } from "modules/auth/utils/validate-user";
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

    const user = await validateUser(authProps);

    SessionUtil.setSession(res, user);

    response = {
      data: user,
      message: "User signed up",
      status: true,
    };
    res.status(200).json(response);
  } catch (error) {
    let errorCode = "";
    if (error instanceof Error) {
      errorCode = error.message;
    }
    const isInvalid = errorCode === ErrorCode.NotFound;

    response = {
      data: null,
      message: isInvalid ? "Invalid Credentials" : "Server Error",
      status: false,
    };
    res.status(isInvalid ? 404 : 500).json(response);
  }
}
