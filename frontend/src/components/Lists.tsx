import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const Lists: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>Saved Conversion Lists</Typography>
        <Paper style={styles.listItem}>List 1</Paper>
        <Paper style={styles.listItem}>List 2</Paper>
        <Paper style={styles.listItem}>List 3</Paper>
      </Box>
    </Container>
  );
};

const styles = {
  listItem: {
    padding: '10px',
    backgroundColor: '#444',
    color: 'white',
    borderRadius: '5px',
    marginTop: '10px',
  } as React.CSSProperties,
};

export default Lists;
