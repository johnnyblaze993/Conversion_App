import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import Home from './components/Home';
import Convert from './components/Convert';
import Favorites from './components/Favorites';
import Lists from './components/Lists';
import Preferences from './components/Preferences';
import LoginPage from './components/LoginPage';
import { useAuthStore } from './stores/authStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Conversion App
          </Typography>
          <Button color="inherit" component={Link} to="/">Convert</Button>
          <Button color="inherit" component={Link} to="/favorites">Fav</Button>
          <Button color="inherit" component={Link} to="/lists">Lists</Button>
          <Button color="inherit" component={Link} to="/preferences">Preferences</Button>

          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}

        </Toolbar>
      </AppBar>
  
            {/* Welcome message centered */}
            {isAuthenticated && user && (
              <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                Welcome, {user.username}!
              </Typography>
            )}
   
      <Container maxWidth="lg" style={{ height: '100vh', width: '100vw', padding: 0, display: 'flex', flexDirection: 'column' }}>
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
    </>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
