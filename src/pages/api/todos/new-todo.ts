import { AppResponse } from "app/lib/app-response";
import { DB } from "app/utils/db-connect";
import { ITodo } from "modules/todos/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;

  // Only allow POST requests
  if (req.method !== "POST") {
    response = {
      data: null,
      message: "Method not allowed",
      status: false,
    };

    res.status(405).json(response);
    return;
  }

  try {
    const todoContent = req.body.todoContent as string;

    if (!todoContent.length) {
      throw new Error("Todo cannot be empty");
    }

    const newTodo: ITodo = {
      id: uuidv4(),
      content: todoContent,
      dueDate: new Date().toISOString(),
      status: "unfinished",
    };

    // read existing todos from todos db
    const todosData = await DB.extractDataFromDb<ITodo[]>("todos");

    // add new todo to existing todos
    todosData.push(newTodo);

    // save todos
    await DB.writeDataToDb("todos", todosData);

    response = {
      data: newTodo,
      message: "Added new todo item",
      status: true,
    };

    // return new todo
    res.status(201).json(response);
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    response = {
      data: null,
      message: errorMessage,
      status: false,
    };
    res.status(400).json(response);
  }
}
