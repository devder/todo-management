import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, writeDataToDb } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;
  const todoId = req.query.todoId;

  try {
    // ============ HANDLE FETCHING TODO ==============
    if (req.method === "GET") {
      const todosData = await extractDataFromDb<ITodo[]>("todos");
      const foundTodo = todosData.find(todo => todo.id === todoId);

      if (!foundTodo) {
        throw new Error("No todo found");
      }

      response = {
        data: foundTodo,
        message: "Found todo item",
        status: true,
      };

      // return found todo
      res.status(200).json(response);
    }

    // ============ HANDLE UPDATING TODO ==============
    else if (req.method === "PUT") {
      const todosData = await extractDataFromDb<ITodo[]>("todos");

      const updatedTodo = req.body.updatedTodo as ITodo;
      // console.log("updatedTodo >>>", updatedTodo);

      const todoIndex = todosData.findIndex(todo => todo.id === todoId);

      if (todoIndex === -1) {
        throw new Error("No todo found");
      }
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
    }

    // ============ RETURN ==============
    else {
      response = {
        data: null,
        message: "Only GET and PUT requests are allowed on this route",
        status: false,
      };
      res.status(404).json(response);
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
