export interface ITodo {
  id: string;
  content: string;
  dueDate: string;
  status: "unfinished" | "done";
}

export enum TodoActionType {
  CREATE_TODO = "CREATE_TODO",
  GET_TODOS = "GET_TODOS",
  UPDATE_TODO = "UPDATE_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export interface TodoAction {
  type: TodoActionType;
  payload: ITodo[];
}
