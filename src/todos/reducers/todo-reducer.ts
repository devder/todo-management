import { ITodo, TodoAction, TodoActionType } from "todos/interfaces";

export const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.GET_TODOS:
      return action.payload;
    case TodoActionType.CREATE_TODO:
      return action.payload.concat(state);

    default:
      return state;
  }
};
