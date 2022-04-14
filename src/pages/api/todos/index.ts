import { AppResponse } from "app/lib/app-response";
import { DB } from "app/utils/db-connect";
import { ITodo } from "modules/todos/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo[]>>) {
  let response: AppResponse<ITodo[]>;

  // this handler should only handle GET requests
  if (req.method === "GET") {
    try {
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
}
