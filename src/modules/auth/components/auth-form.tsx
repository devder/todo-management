import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "modules/auth/styles/auth-form.module.scss";
import { useState } from "react";

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => {
    setIsSignIn(prev => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Email Address" name="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" />
          <Button type="submit" fullWidth variant="contained" className={styles.auth_button}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
            <Typography>{`Don't have an account ?`}</Typography>
            <Button className={styles.alt_button} onClick={toggleAuthMode}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
export default AuthForm;
