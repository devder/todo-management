import { ITodo } from "todos/interfaces";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: ITodo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};
