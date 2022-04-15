import { AppResponse } from "app/lib/app-response";
import { ErrorCode } from "app/lib/error-code";
import { IUser } from "modules/auth/interfaces/IUser";
import { SessionUtil } from "modules/auth/utils/session-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<IUser | null>>) {
  let response: AppResponse<IUser | null>;

  // Only allow GET requests
  if (req.method !== "GET") {
    response = {
      data: null,
      message: "Method not allowed",
      status: false,
    };

    res.status(405).json(response);
    return;
  }

  try {
    const payload = SessionUtil.getSession(req) as IUser;

    if (payload) {
      response = {
        data: payload,
        message: "Found user",
        status: true,
      };
      res.status(200).json(response);
    } else {
      throw new Error(ErrorCode.Unauthorized);
    }
  } catch (error) {
    let errorCode = "";
    if (error instanceof Error) {
      errorCode = error.message;
    }
    const unauthorized = errorCode === ErrorCode.Unauthorized;

    response = {
      data: null,
      message: unauthorized ? "Session Expired" : "Server Error",
      status: false,
    };
    res.status(unauthorized ? 401 : 500).json(response);
  }
}
