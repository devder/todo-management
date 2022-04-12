export interface ITodo {
  id: string;
  content: string;
  dueDate: Date;
  status: "unfinished" | "done";
}
