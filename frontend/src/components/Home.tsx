import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#222',
      }}
    >
      <Box>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/convert"
          style={{ fontSize: '24px', padding: '20px 40px' }}
        >
          Convert
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
