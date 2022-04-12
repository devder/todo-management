import { fetcher } from "app/utils/fetcher";
import { createContext, useReducer } from "react";
import { ITodo, TodoActionType } from "todos/interfaces";
import { todoReducer } from "todos/reducers/todo-reducer";

const initialState: ITodo[] = [];

type InitialStateType = {
  todos: ITodo[];
  getTodos: (inittialTodos: ITodo[]) => void;
  newTodo: (todoContent: string) => Promise<void>;
  updateTodo: (todoContent: ITodo) => Promise<void>;
};

export const TodosContext = createContext<InitialStateType>({
  todos: initialState,
  getTodos: () => null,
  newTodo: () => new Promise<void>((_, __) => {}),
  updateTodo: () => new Promise<void>((_, __) => {}),
});

interface TodosProviderProps {
  children: React.ReactNode;
  value: ITodo[];
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const getTodos = (initialTodos: ITodo[]) => {
    dispatch({ type: TodoActionType.GET_TODOS, payload: initialTodos });
  };

  const newTodo = async (todoContent: string) => {
    try {
      const { data, status } = await fetcher<ITodo>("/api/todos/new-todo", "POST", { todoContent });

      if (status) {
        dispatch({ type: TodoActionType.CREATE_TODO, payload: [data] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedTodo: ITodo) => {
    try {
      const { data, status } = await fetcher<ITodo>("/api/todos/update-todo", "PUT", { updatedTodo });

      if (status) {
        dispatch({ type: TodoActionType.UPDATE_TODO, payload: [data] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <TodosContext.Provider value={{ todos, getTodos, newTodo, updateTodo }}>{children}</TodosContext.Provider>;
};
