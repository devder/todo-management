import styles from "todos/styles/todo-item.module.scss";

interface TodoItemProps {}

export const TodoItem: React.FC<TodoItemProps> = ({}) => {
  return (
    <div className={styles.continents_todo_row}>
      <div className={styles.continents_todo_name}>{"continent.name"}</div>
      <div className={styles.continents_todo_code}>{"continent.code"}</div>
    </div>
  );
};
