import { TodoItem } from "./todo-item";

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = ({}) => {
  return (
    <>
      {[1, 2, 3].map(i => {
        return <TodoItem key={i} />;
      })}
    </>
  );
};
