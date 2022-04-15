import { AppResponse } from "app/lib/app-response";
import { ErrorCode } from "app/lib/error-code";
import { DB } from "app/utils/db-connect";
import { ITodo } from "modules/todos/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;
  const todoId = req.query.todoId;

  try {
    // ============ HANDLE FETCHING TODO ==============
    if (req.method === "GET") {
      const todosData = await DB.extractDataFromDb<ITodo[]>("todos");
      const foundTodo = todosData.find(todo => todo.id === todoId);

      if (!foundTodo) {
        throw new Error(ErrorCode.NotFound);
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
      const todosData = await DB.extractDataFromDb<ITodo[]>("todos");

      const updatedTodo = req.body.updatedTodo as ITodo;

      const isValid =
        typeof updatedTodo.id === "string" &&
        updatedTodo.id.length &&
        typeof updatedTodo.content === "string" &&
        updatedTodo.content.length &&
        typeof updatedTodo.dueDate === "string" &&
        updatedTodo.dueDate.length &&
        (updatedTodo.status === "unfinished" || updatedTodo.status === "done");

      if (!isValid) {
        throw new Error(ErrorCode.Forbidden);
      }

      const todoIndex = todosData.findIndex(todo => todo.id === todoId);

      if (todoIndex === -1) {
        throw new Error(ErrorCode.NotFound);
      }
      // update todo in existing todos
      todosData[todoIndex] = updatedTodo;

      await DB.writeDataToDb("todos", todosData);

      response = {
        data: updatedTodo,
        message: "Updated todo item",
        status: true,
      };

      // return updated todo
      res.status(201).json(response);
    }

    // ============ Only allow GET and PUT requests ==========
    else {
      response = {
        data: null,
        message: "Method not allowed",
        status: false,
      };

      res.status(405).json(response);
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
