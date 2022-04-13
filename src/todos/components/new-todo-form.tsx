import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { TodosContext } from "todos/context/todos-context";
import styles from "todos/styles/new-todo-form.module.scss";

const NewTodoForm: React.VFC = ({}) => {
  const { newTodo } = useContext(TodosContext);

  const [todoContent, setTodoContent] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }
    setTodoContent(e.target.value);
  };

  const handleAddNewTodo = async () => {
    if (!todoContent.trim().length) {
      setError(true);
      return;
    }
    await newTodo(todoContent);
    setTodoContent("");
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.card_content}>
        <TextField
          id="new-todo-form"
          label="Enter new todo..."
          variant="outlined"
          required
          value={todoContent}
          error={error}
          className={styles.todo_input}
          onChange={handleInputChange}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          endIcon={<AddCircleOutline />}
          className={styles.todo_form_button}
          onClick={handleAddNewTodo}
        >
          Add Todo
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewTodoForm;
