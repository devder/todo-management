import { NextApiResponse } from "next";
import { IUser } from "../interfaces/IUser";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import env from "app/lib/environment";

export class SessionUtil {
  static cookieMaxAge = 60 * 60 * 24; // 1 day
  static cookieName = "sid";

  static async setSession(res: NextApiResponse, user: IUser) {
    // generate jsonwebtoken, store on the session object,
    const userJWT = jwt.sign({ id: user.id, username: user.username }, env.jwtKey);

    const cookie = serialize(this.cookieName, userJWT, {
      maxAge: this.cookieMaxAge,
      expires: new Date(Date.now() + this.cookieMaxAge * 1000),
      secure: process.env.NODE_ENV === "production", // cookie only works in https
      path: "/",
      sameSite: "strict", // protect against csrf
      httpOnly: true, // makes the cookie unaccessible in the js code on the front end
    });

    res.setHeader("Set-Cookie", cookie);
  }
}
