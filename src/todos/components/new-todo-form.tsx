import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import styles from "todos/styles/new-todo-form.module.scss";

export const NewTodoForm: React.VFC = ({}) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.card_content}>
        <TextField
          id="new-todo-form"
          label="Enter new todo..."
          variant="outlined"
          required
          className={styles.todo_input}
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
