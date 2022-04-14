import { AppResponse } from "app/lib/app-response";
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
      console.error(error);
      response = {
        data: null,
        message: error as string,
        status: false,
      };
      res.status(400).json(response);
    }
  }
}
