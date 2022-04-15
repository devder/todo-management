import { AppResponse } from "app/lib/app-response";
import { DB } from "app/utils/db-connect";
import { ITodo } from "modules/todos/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo[]>>) {
  let response: AppResponse<ITodo[]>;

  // Only allow GET requests
  if (req.method !== "GET") {
    response = {
      data: [],
      message: "Method not allowed",
      status: false,
    };

    res.status(405).json(response);
    return;
  }

  try {
    // read existing todos from todos db
    const todos = await DB.extractDataFromDb<ITodo[]>("todos");

    response = {
      data: todos.reverse(),
      message: "List of Todos",
      status: true,
    };

    res.status(200).json(response);
  } catch (error) {
    response = {
      data: [],
      message: error as string,
      status: false,
    };
    res.status(400).json(response);
  }
}
