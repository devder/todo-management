import env from "app/lib/environment";
import { AppResponse } from "app/lib/app-response";
import { ITodo, TodoAction, TodoActionType } from "todos/interfaces";
import { Dispatch } from "react";

export const newTodo = async (dispatch: Dispatch<TodoAction>, todoContent: string) => {
  try {
    const res = await fetch(`${env.clientUrl}/api/todos/new-todo`, {
      body: JSON.stringify({ todoContent }),
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // read response in json format
    const { data, status } = (await res.json()) as AppResponse<ITodo>;

    if (status) {
      dispatch({ type: TodoActionType.CREATE_TODO, payload: data });
    }
  } catch (error) {
    console.error(error);
  }
};
