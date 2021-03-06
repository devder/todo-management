import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TodosContext } from "modules/todos/context/todos-context";
import { ITodo } from "modules/todos/interfaces";
import styles from "modules/todos/styles/todo-item.module.scss";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const router = useRouter();
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

  const navigateToEditPage = () => {
    router.push(`/todos/${currentTodo.id}`);
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
        <IconButton aria-label="edit" color="inherit" onClick={navigateToEditPage}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={handleDeleteTodo}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TodoItem;
