import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, writeDataToDb } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;

  if (req.method === "PUT") {
    try {
      const todoId = req.query.todoId;
      const updatedTodo = req.body.updatedTodo as ITodo;
      // console.log("updatedTodo >>>", updatedTodo);

      // get existing todos from db
      const todosData = await extractDataFromDb<ITodo[]>("todos");

      const todoIndex = todosData.findIndex(todo => todo.id === todoId);

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
