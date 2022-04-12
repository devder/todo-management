import { ITodo, TodoAction } from "todos/interfaces";

export const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case "CREATE_TODO":
      return { ...state };

    default:
      return state;
  }
};
