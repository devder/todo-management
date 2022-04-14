import { AppResponse } from "app/lib/app-response";
import { DB } from "app/utils/db-connect";
import { ITodo } from "modules/todos/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppResponse<ITodo | null>>) {
  let response: AppResponse<ITodo | null>;

  // this handler should only handle post requests
  if (req.method === "POST") {
    try {
      const todoContent = req.body.todoContent as string;

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

      await DB.writeDataToDb("todos", todosData);

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
}
