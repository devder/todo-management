import { AppResponse } from "app/lib/app-response";
import { SessionUtil } from "modules/auth/utils/session-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(_: NextApiRequest, res: NextApiResponse<AppResponse<null>>) {
  SessionUtil.invalidateSession(res);
  const response: AppResponse<null> = {
    data: null,
    message: "Logged Out",
    status: true,
  };

  res.json(response);
}
