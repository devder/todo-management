import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ITodo } from "todos/interfaces";
import styles from "todos/styles/todo-item.module.scss";

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const isDone = todo.status === "done" ? true : false;

  return (
    <div className={styles.todo_row}>
      <FormControlLabel
        className={styles.todo_name}
        label={todo.content}
        control={<Checkbox checked={isDone} />}
        sx={{ textDecoration: isDone ? "line-through" : "none" }}
      />
      <div className={styles.action_buttons}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
