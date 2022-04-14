import { ITodo } from "modules/todos/interfaces";
import TodoItem from "./todo-item";

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};

export default TodoList;
