import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import Home from './components/Home';
import Convert from './components/Convert';
import Favorites from './components/Favorites';
import Lists from './components/Lists';
import Preferences from './components/Preferences';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Conversion App
          </Typography>
          <Button color="inherit" component={Link} to="/">Convert</Button>
          <Button color="inherit" component={Link} to="/favorites">Fav</Button>
          <Button color="inherit" component={Link} to="/lists">Lists</Button>
          <Button color="inherit" component={Link} to="/preferences">Preferences</Button>
		  <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ height: '100vh', width: '100vw', padding: 0, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/preferences" element={<Preferences />} />
		  <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
