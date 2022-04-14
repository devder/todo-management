import { AppResponse } from "app/lib/app-response";
import { AuthProps } from "modules/auth/interfaces";
import { ITodo } from "modules/todos/interfaces";

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";
export type FetcherBodyType = Record<string, string | ITodo | AuthProps | Record<string, string>>;

export const fetcher = async <T>(
  // default params for the fetcher
  url: string,
  method: HttpMethods = "GET",
  body: FetcherBodyType = {}
): Promise<AppResponse<T>> => {
  // fetch
  const res = await fetch(url, {
    method,
    body: method === "GET" ? null : JSON.stringify(body),
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // convert response to json
  const jsonResponse = (await res.json()) as AppResponse<T>;

  return jsonResponse;
};
