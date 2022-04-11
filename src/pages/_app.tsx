import type { AppProps } from "next/app";
import "../styles/globals.css";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Poppins", "sans-serif"].join(","),
//   },
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
