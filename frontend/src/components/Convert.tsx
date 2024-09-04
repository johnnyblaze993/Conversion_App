import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useConversionStore } from '../stores/conversionStore';

const Convert: React.FC = () => {
  const [listName, setListName] = useState<string>('');  
  const [favorite, setFavorite] = useState<boolean>(false); // State for the favorite checkbox
  const [items, setItems] = useState([
    { ingredient: '', originalMeasurement: '', originalUnit: '', convertedMeasurement: '', convertedUnit: '' }
  ]);
  const createConversionList = useConversionStore((state) => state.createConversionList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedItems = items.map(item => ({
      ingredient: item.ingredient,
      originalMeasurement: parseFloat(item.originalMeasurement),
      originalUnit: item.originalUnit,
      convertedMeasurement: parseFloat(item.convertedMeasurement),
      convertedUnit: item.convertedUnit,
    }));

    // Submit the list along with the favorite status
    createConversionList(listName, formattedItems, favorite);
  };

  const addNewItem = () => {
    setItems([...items, { ingredient: '', originalMeasurement: '', originalUnit: '', convertedMeasurement: '', convertedUnit: '' }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
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
        <Typography variant="h5" gutterBottom>Create New Conversion List</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="List Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          {/* Checkbox for setting the list as favorite */}
          <FormControlLabel
            control={
              <Checkbox
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                style={{ color: 'white' }}
              />
            }
            label="Mark as Favorite"
            style={{ color: 'white' }}
          />

          {items.map((item, index) => (
            <Grid container spacing={2} key={index}>
              {/* Fields for adding items */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ingredient"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={item.ingredient}
                  onChange={(e) => updateItem(index, 'ingredient', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Original Measurement"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={item.originalMeasurement}
                  onChange={(e) => updateItem(index, 'originalMeasurement', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Original Unit"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={item.originalUnit}
                  onChange={(e) => updateItem(index, 'originalUnit', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Converted Measurement"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={item.convertedMeasurement}
                  onChange={(e) => updateItem(index, 'convertedMeasurement', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Converted Unit"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={item.convertedUnit}
                  onChange={(e) => updateItem(index, 'convertedUnit', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </Grid>
            </Grid>
          ))}

          <Button type="button" variant="contained" color="primary" onClick={addNewItem} style={{ marginTop: '20px' }}>
            Add New Item
          </Button>

          <Button type="submit" variant="contained" color="secondary" fullWidth style={{ marginTop: '20px' }}>
            Save Conversion List
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Convert;
