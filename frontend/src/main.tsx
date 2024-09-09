import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import App from "./App";
import { usePreferencesStore } from "./stores/preferencesStore"; // Store for theme handling

const Main = () => {
  const {
    themeType,
    selectedThemeIndex,
    darkThemes,
    lightThemes,
  } = usePreferencesStore(); // Get the theme settings from the store

  // Choose the theme based on theme type (light or dark) and the selected index
  const selectedTheme =
    themeType === "dark"
      ? darkThemes[selectedThemeIndex]
      : lightThemes[selectedThemeIndex];

  // Create the MUI theme with the selected theme object
  const theme = createTheme({
    ...selectedTheme,
    palette: {
      ...selectedTheme.palette,
      mode: themeType, // Ensures that dark and light mode are applied properly
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);
