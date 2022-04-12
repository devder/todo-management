import { createContext, useReducer } from "react";
import { ITodo, TodoActionType } from "todos/interfaces";
import { todoReducer } from "todos/reducers/todo-reducer";
import env from "app/lib/environment";
import { AppResponse } from "app/lib/app-response";

const initialState: ITodo[] = [];

type InitialStateType = {
  todos: ITodo[];
  newTodo: (todoContent: string) => Promise<void>;
};

export const TodosContext = createContext<InitialStateType>({
  todos: initialState,
  newTodo: () => new Promise<void>((_, __) => {}),
});

interface TodosProviderProps {
  children: React.ReactNode;
  value: ITodo[];
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const newTodo = async (todoContent: string) => {
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

  return <TodosContext.Provider value={{ todos, newTodo }}>{children}</TodosContext.Provider>;
};
