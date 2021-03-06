import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { TodosContext } from "modules/todos/context/todos-context";
import styles from "modules/todos/styles/todo-form.module.scss";
import { ChangeEvent, useContext, useState } from "react";

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
    <Card className={styles.card} sx={{ backgroundColor: "inherit" }}>
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
          sx={{ color: "white" }}
          onClick={handleAddNewTodo}
        >
          Add Todo
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewTodoForm;
