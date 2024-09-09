import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { Toolbar, Button, Typography, Container, Box, useTheme } from "@mui/material";
import Home from "./components/Home";
import Convert from "./components/Convert";
import Favorites from "./components/Favorites";
import Lists from "./components/Lists";
import Preferences from "./components/Preferences";
import LoginPage from "./components/LoginPage";
import { useAuthStore } from "./stores/authStore";
import SnackbarComponent from "./components/reusable/SnackbarComponent";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme(); // Access the current theme

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Updated Box with dynamic background and text based on theme */}
      <Box
        sx={{
          flexGrow: 1,
          marginBottom: "20px",
          backgroundColor: theme.palette.background.paper, // Theme-based background color
          color: theme.palette.text.primary, // Theme-based text color
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Conversion App
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: theme.palette.primary.contrastText, // Ensure button text contrasts with theme
            }}
          >
            Convert
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/favorites"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Fav
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/lists"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Lists
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/preferences"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Preferences
          </Button>

          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: theme.palette.error.main, // Logout with error color theme for distinction
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: "90vh",
          width: "100vw",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default, // Theme-based background for the main container
          color: theme.palette.text.primary, // Theme-based text color
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/convert"
            element={
              <PrivateRoute>
                <Convert />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/lists"
            element={
              <PrivateRoute>
                <Lists />
              </PrivateRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <PrivateRoute>
                <Preferences />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>

      {/* Global Snackbar for notifications */}
      <SnackbarComponent />
    </>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
