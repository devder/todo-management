import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, writeDataToDb } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;

  // this handler should only handle PUT requests
  if (req.method === "PUT") {
    try {
      const updatedTodo = req.body.updatedTodo as ITodo;

      // get existing todos from db
      const todosData = await extractDataFromDb<ITodo[]>("todos");

      const todoIndex = todosData.findIndex(todo => todo.id === updatedTodo.id);

      // update todo in existing todos
      todosData[todoIndex] = updatedTodo;

      await writeDataToDb("todos", todosData);

      response = {
        data: updatedTodo,
        message: "Updated todo item",
        status: true,
      };

      // return updated todo
      res.status(201).json(response);
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
