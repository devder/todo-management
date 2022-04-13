import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, writeDataToDb } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;
  const todoId = req.query.todoId;

  try {
    // get existing todos from db
    const todosData = await extractDataFromDb<ITodo[]>("todos");

    if (req.method === "GET") {
      const todosData = await extractDataFromDb<ITodo[]>("todos");
      const foundTodo = todosData.find(todo => todo.id === todoId);

      if (foundTodo) {
        response = {
          data: foundTodo,
          message: "Found todo item",
          status: true,
        };

        // return found todo
        res.status(200).json(response);
      } else {
        throw new Error("No todo found");
      }
    }

    if (req.method === "PUT") {
      const updatedTodo = req.body.updatedTodo as ITodo;
      // console.log("updatedTodo >>>", updatedTodo);

      const todoIndex = todosData.findIndex(todo => todo.id === todoId);

      if (todoIndex !== -1) {
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
      } else {
        throw new Error("No todo found");
      }
    }
  } catch (error) {
    response = {
      data: null,
      message: error as string,
      status: false,
    };
    res.status(400).json(response);
  }
}
