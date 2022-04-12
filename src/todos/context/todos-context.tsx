import { createContext, useReducer } from "react";
import { ITodo } from "todos/interfaces";

interface TodosContextProps {
  todos: ITodo[];
}

const initialState: { todos: ITodo[] } = {
  todos: [],
};

export const TodosContext = createContext<TodosContextProps>(null!);

interface TodosProviderProps {
  children: React.ReactNode;
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  // const [todos, dispatch ] = useReducer(, initialState)
  return <TodosContext.Provider value={{ todos: [] }}>{children}</TodosContext.Provider>;
};
