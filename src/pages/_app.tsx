import { CustomThemeProvider } from "app/contexts/custom-theme";
import { AuthProvider } from "modules/auth/context/auth-context";
import { TodosProvider } from "modules/todos/context/todos-context";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, todos, colorMode, ...otherPageProps } = pageProps;

  return (
    <CustomThemeProvider value={colorMode}>
      <AuthProvider value={user}>
        <TodosProvider value={todos}>
          <Component {...otherPageProps} />
        </TodosProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default MyApp;
