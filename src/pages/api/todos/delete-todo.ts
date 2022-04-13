import { AppResponse } from "app/lib/app-response";
import { DB } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo[] | null>>) {
  let response: AppResponse<ITodo[] | null>;

  if (req.method === "DELETE") {
    try {
      const todoId = req.body.todoId as string;

      // get existing todos from db
      const todosData = await DB.extractDataFromDb<ITodo[]>("todos");

      // remove selected todo from the collection
      const filteredTodos = todosData.filter(todo => todo.id !== todoId);

      await DB.writeDataToDb("todos", filteredTodos);

      response = {
        data: filteredTodos.reverse(),
        message: "Deleted todo item",
        status: true,
      };

      // return updated todos list
      res.status(200).json(response);
    } catch (error) {
      response = {
        data: null,
        message: error as string,
        status: false,
      };
      res.status(400).json(response);
    }
  }
}
