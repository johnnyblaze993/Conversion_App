import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Grid } from '@mui/material';

const Convert: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number | string>('');
  const [unit, setUnit] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, number, unit });
  };

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
      <Paper style={{ padding: '20px', backgroundColor: '#333', color: 'white', width: '100%' }}>
        <Typography variant="h5" gutterBottom>New Conversion</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Unit"
                variant="outlined"
                fullWidth
                margin="normal"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Convert;
