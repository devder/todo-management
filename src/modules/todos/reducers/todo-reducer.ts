import { ITodo, TodoAction, TodoActionType } from "modules/todos/interfaces";

export const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.GET_TODOS:
      return action.payload;
    case TodoActionType.CREATE_TODO:
      return action.payload.concat(state);
    case TodoActionType.UPDATE_TODO:
      const updatedTodo = action.payload[0];
      // find todo in state
      const todoIndex = state.findIndex(todo => todo.id === updatedTodo.id);
      state[todoIndex] = updatedTodo;
      return state;
    case TodoActionType.DELETE_TODO:
      return action.payload;

    default:
      return state;
  }
};
