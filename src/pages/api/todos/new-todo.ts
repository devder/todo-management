import { AppResponse } from "app/lib/app-response";
import { extractDataFromDb, writeDataToDb } from "app/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITodo } from "todos/interfaces";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;

  // this method should only handle post requests
  if (req.method !== "POST") {
    response = {
      data: null,
      message: "only POST request is allowed on this route",
      status: false,
    };

    res.status(405).json(response);
  }

  try {
    const { content } = req.body;
    const newTodo: ITodo = { id: uuidv4(), content, dueDate: new Date().toISOString(), status: "unfinished" };

    // read existing todos from todos db
    const todosData = await extractDataFromDb<ITodo[]>("todos");

    // add new todo to existing todos
    todosData.push(newTodo);

    await writeDataToDb("todos", todosData);

    response = {
      data: newTodo,
      message: "Added new todo item",
      status: true,
    };

    // return new todo
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
