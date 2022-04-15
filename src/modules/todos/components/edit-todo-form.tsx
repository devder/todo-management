import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TodosContext } from "modules/todos/context/todos-context";
import { ITodo } from "modules/todos/interfaces";
import styles from "modules/todos/styles/todo-form.module.scss";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";

interface FormProps {
  todo: ITodo;
}
const EditTodoForm: React.FC<FormProps> = ({ todo }) => {
  const router = useRouter();
  const { updateTodo } = useContext(TodosContext);
  const [currentTodo, setCurrentTodo] = useState(todo);

  const [error, setError] = useState(false);

  const goBack = () => {
    router.back();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
      return;
    }
    setCurrentTodo(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      setCurrentTodo(prev => {
        return {
          ...prev,
          dueDate: newValue.toISOString(),
        };
      });
    }
  };

  const handleUpdateTodo = async () => {
    if (!currentTodo.content.trim().length) {
      setError(true);
      return;
    }
    await updateTodo(currentTodo);
    router.push("/");
  };

  return (
    <Card className={styles.card} sx={{ backgroundColor: "inherit" }}>
      <CardContent className={styles.card_content}>
        <TextField
          id="new-todo-form"
          name="content"
          label="Update todo..."
          variant="outlined"
          margin="normal"
          value={currentTodo.content}
          error={error}
          className={styles.todo_input}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="Due Date"
            inputFormat="DD/MM/YYYY"
            value={currentTodo.dueDate}
            onChange={handleDateChange}
            renderInput={params => <TextField {...params} className={styles.todo_input} margin="normal" />}
          />
        </LocalizationProvider>
      </CardContent>
      <CardActions>
        <Stack spacing={5} direction="row">
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
            className={styles.back_button}
            onClick={goBack}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            className={styles.todo_form_button}
            onClick={handleUpdateTodo}
            sx={{ color: "white" }}
          >
            Save
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default EditTodoForm;
