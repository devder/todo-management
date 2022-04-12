import { createContext, useReducer } from "react";
import { ITodo } from "todos/interfaces";
import { todoReducer } from "todos/reducers/todo-reducer";

const initialState: ITodo[] = [];

type InitialStateType = {
  todos: ITodo[];
};

export const TodosContext = createContext<InitialStateType>({ todos: initialState });

interface TodosProviderProps {
  children: React.ReactNode;
  value: ITodo[];
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return <TodosContext.Provider value={{ todos }}>{children}</TodosContext.Provider>;
};
