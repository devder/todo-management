import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

export const CustomThemeContext = createContext({ toggleColorMode: () => {} });

interface ThemeProviderProps {
  children: React.ReactNode;
  value: {
    toggleColorMode: () => void;
  };
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
        document.documentElement.setAttribute("data-theme", mode === "light" ? "dark" : "light");
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
      },
      palette: {
        mode,
      },
    });
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <CustomThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
