import { AppResponse } from "app/lib/app-response";
import { ErrorCode } from "app/lib/error-code";
import { AuthProps } from "modules/auth/interfaces";
import { IUser } from "modules/auth/interfaces/IUser";
import { buildUser } from "modules/auth/utils/build-user";
import { SessionUtil } from "modules/auth/utils/session-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<IUser | null>>) {
  let response: AppResponse<IUser | null>;

  if (req.method === "POST") {
    try {
      const authProps = req.body.authProps as AuthProps;

      const user = await buildUser(authProps);

      await SessionUtil.setSession(res, user);

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
      const alreadyExists = errorCode === ErrorCode.AlreadyExists;

      response = {
        data: null,
        message: alreadyExists ? "A user with that username already exists" : "Server Error",
        status: false,
      };
      res.status(500).json(response);
    }
  }
}
