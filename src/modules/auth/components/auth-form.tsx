import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "modules/auth/styles/auth-form.module.scss";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";

const AuthForm: React.FC = () => {
  const router = useRouter();
  const { signUp, signIn } = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    password: "",
  });
  const [authErrors, setAuthErrors] = useState({
    username: "",
    password: "",
  });

  const toggleAuthMode = () => {
    setIsSignIn(prev => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authInfo.username.length < 3) {
      setAuthErrors(prev => {
        return {
          ...prev,
          username: "Username must be at least 3 characters",
        };
      });
      return;
    }

    if (authInfo.password.length < 4) {
      setAuthErrors(prev => {
        return {
          ...prev,
          password: "Password must be at least 4 characters",
        };
      });
      return;
    }

    let response: { status?: boolean; message?: string };

    if (isSignIn) {
      response = await signIn(authInfo);
    } else {
      response = await signUp(authInfo);
    }

    if (response.status) {
      router.replace("/");
      return;
    } else {
      setAuthErrors({
        password: response.message!,
        username: response.message!,
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (authErrors.username.length || authErrors.password.length) {
      setAuthErrors({ username: "", password: "" });
    }
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            onChange={handleInputChange}
            autoFocus
            error={authErrors.username.length > 0}
            helperText={authErrors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
            error={authErrors.password.length > 0}
            helperText={authErrors.password}
          />
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
