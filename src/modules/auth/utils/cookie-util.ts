import { NextApiRequest } from "next";
import { parse } from "cookie";

export class CookieUtil {
  static cookieName = "sid";

  static parseCookies(req: NextApiRequest) {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies;

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie;
    return parse(cookie || "");
  }

  static getCookieValue(req: NextApiRequest): string {
    const cookies = this.parseCookies(req);
    return cookies[this.cookieName];
  }
}
