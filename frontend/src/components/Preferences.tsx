import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';

const Preferences: React.FC = () => {
  const [defaultUnit, setDefaultUnit] = useState<string>('');
  const [measurementType, setMeasurementType] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ defaultUnit, measurementType });
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
        <Typography variant="h5" gutterBottom>User Preferences</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Default Unit"
            variant="outlined"
            fullWidth
            margin="normal"
            value={defaultUnit}
            onChange={(e) => setDefaultUnit(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Measurement Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={measurementType}
            onChange={(e) => setMeasurementType(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Preferences;
