import { AppResponse } from "app/lib/app-response";

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = async <T>(
  // default params for the fetcher
  url: string,
  method: HttpMethods = "GET",
  body: Record<string, string> = {}
): Promise<AppResponse<T>> => {
  // fetch
  const res = await fetch(url, {
    body: JSON.stringify(body),
    method: method,
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
