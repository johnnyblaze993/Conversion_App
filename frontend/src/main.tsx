import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";
import { usePreferencesStore } from "./stores/preferencesStore"; // Store for theme handling

const Main = () => {
  const { themeType, selectedThemeIndex, darkThemes, lightThemes } =
    usePreferencesStore(); // Get the theme type and index from the preferences store

  // Choose the theme based on the type and index
  const selectedTheme =
    themeType === "dark" ? darkThemes[selectedThemeIndex] : lightThemes[selectedThemeIndex];

  // Create the theme using MUI's `createTheme`
  const theme = createTheme(selectedTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);
