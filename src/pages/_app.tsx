import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomThemeProvider } from "app/components/custom-theme-context";
import { AuthProvider } from "modules/auth/context/auth-context";
import { TodosProvider } from "modules/todos/context/todos-context";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Poppins", "sans-serif"].join(","),
//   },
//   palette: {
//     mode: "dark",
//   },
// });

function MyApp({ Component, pageProps }: AppProps) {
  const { user, todos, colorMode, ...otherPageProps } = pageProps;

  return (
    <CustomThemeProvider value={colorMode}>
      <AuthProvider value={user}>
        <TodosProvider value={todos}>
          <Component {...otherPageProps} />;
        </TodosProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default MyApp;
