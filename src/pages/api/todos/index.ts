import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, getDbPath } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo[]>>) {
  let response: AppResponse<ITodo[]>;

  if (req.method !== "GET") {
    response = {
      data: [],
      message: "only GET request is allowed on this route",
      status: false,
    };

    res.status(405).json(response);
  }

  try {
    const filePath = getDbPath("todos");
    const todosJson = extractDataFromDb<ITodo[]>(filePath);

    response = {
      data: todosJson,
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
