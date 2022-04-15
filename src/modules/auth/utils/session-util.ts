import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../interfaces/IUser";
import { serialize } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "app/lib/environment";
import { CookieUtil } from "./cookie-util";
import { ErrorCode } from "app/lib/error-code";

export class SessionUtil {
  static cookieMaxAge = 60 * 60 * 24; // 1 day
  static cookieName = "sid";

  static setSession(res: NextApiResponse, user: IUser) {
    // generate jsonwebtoken, store on the cookie object,
    const userJWT = jwt.sign({ id: user.id, username: user.username }, env.jwtKey, {
      expiresIn: this.cookieMaxAge,
    });

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

  static invalidateSession(res: NextApiResponse) {
    const cookie = serialize(this.cookieName, "", {
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
  }

  static getSession = (req: NextApiRequest) => {
    const cookie = CookieUtil.getCookieValue(req);

    if (!cookie) {
      throw new Error(ErrorCode.Unauthorized);
    }

    const payload = jwt.verify(cookie, env.jwtKey) as JwtPayload;

    if (!payload || Date.now() >= payload.exp! * 1000) {
      throw new Error(ErrorCode.Unauthorized);
    }

    return payload;
  };
}
