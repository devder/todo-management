import { ITodo, TodoAction, TodoActionType } from "todos/interfaces";

export const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.CREATE_TODO:
      return [action.payload, ...state];

    default:
      return state;
  }
};
