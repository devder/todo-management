import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useContext, useState } from "react";
import { TodosContext } from "todos/context/todos-context";
import { ITodo } from "todos/interfaces";
import styles from "todos/styles/todo-item.module.scss";

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const [currentTodo, setCurrentTodo] = useState(todo);
  const isDone = currentTodo.status === "done";

  const toggleTodoStatus = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(prev => {
      return {
        ...prev,
        status: event.target.checked ? "done" : "unfinished",
      };
    });

    await updateTodo({
      ...currentTodo,
      status: event.target.checked ? "done" : "unfinished",
    });
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(currentTodo.id);
  };

  return (
    <div className={styles.todo_row}>
      <FormControlLabel
        className={styles.todo_name}
        label={currentTodo.content}
        control={<Checkbox checked={isDone} onChange={toggleTodoStatus} />}
        sx={{ textDecoration: isDone ? "line-through" : "none" }}
      />
      <div className={styles.action_buttons}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={handleDeleteTodo}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
