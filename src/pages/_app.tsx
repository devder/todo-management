import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosProvider } from "todos/context/todos-context";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { todos, ...otherPageProps } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider value={todos}>
        <Component {...otherPageProps} />;
      </TodosProvider>
    </ThemeProvider>
  );
}

export default MyApp;
