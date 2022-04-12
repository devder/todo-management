import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styles from "todos/styles/new-todo-form.module.scss";

export const NewTodoForm: React.VFC = ({}) => {
  const [todoContent, setTodoContent] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setTodoContent(e.target.value);

  return (
    <Card className={styles.card}>
      <CardContent className={styles.card_content}>
        <TextField
          id="new-todo-form"
          label="Enter new todo..."
          variant="outlined"
          required
          className={styles.todo_input}
          onChange={handleInputChange}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" endIcon={<AddCircleOutline />} className={styles.todo_form_button}>
          Add Todo
        </Button>
      </CardActions>
    </Card>
  );
};
