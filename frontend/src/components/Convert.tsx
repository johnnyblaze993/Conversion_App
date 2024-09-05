import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Paper, Typography, Grid, MenuItem } from '@mui/material';
import { useUnitStore } from '../stores/unitStore';
import { useAuthStore } from '../stores/authStore';
import { useConversionStore } from '../stores/conversionStore';
import { useListsStore } from '../stores/listsStore';
import { convertMeasurement } from '../utils/conversionUtils';

interface ConversionItem {
  ingredient: string;
  originalMeasurement: number;
  originalUnitId: number;
  convertedMeasurement: number;
  convertedUnitId: number;
}

const Convert: React.FC = () => {
  const [listName, setListName] = useState<string>('');  
  const [items, setItems] = useState([
    { ingredient: '', originalMeasurement: '', originalUnit: '', convertedMeasurement: '', convertedUnit: '' }
  ]);
  const { units, fetchUnits } = useUnitStore();
  const { user } = useAuthStore(); // Fetch the logged-in user
  const { createList } = useListsStore();
  const { addConversionsToList } = useConversionStore();

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  // Function to map unit name to unit ID for the request
  const getUnitIdByName = (unitName: string) => {
    const unit = units.find(u => u.unitName === unitName);
    return unit ? unit.id : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Guard against missing user
    if (!user) {
      console.error('User is not logged in');
      return;
    }
  
    try {
      // Step 1: Create the conversion list
      const listResponse = await createList(listName, false); // Create the list and return listId
  
      if (listResponse) {
        const listId = listResponse.id;
  
        // Step 2: Prepare the conversion items, filtering out invalid unit IDs
        const formattedItems = items
          .map((item) => {
            const originalUnitId = getUnitIdByName(item.originalUnit);
            const convertedUnitId = getUnitIdByName(item.convertedUnit);
  
            // Check if unit IDs are valid (non-null)
            if (originalUnitId === null || convertedUnitId === null) {
              console.warn(`Skipping invalid item: ${item.ingredient}`);
              return null;
            }
  
            return {
              ingredient: item.ingredient,
              originalMeasurement: parseFloat(item.originalMeasurement),
              originalUnitId,
              convertedMeasurement: parseFloat(item.convertedMeasurement),
              convertedUnitId,
            };
          })
          .filter(item => item !== null) as ConversionItem[]; // Filter out invalid items
  
        // Step 3: Submit the valid items
        if (formattedItems.length === 0) {
          alert('No valid conversions to add.');
          return;
        }
  
        await addConversionsToList(listId, formattedItems);
        alert('Conversion list and items added successfully!');
      }
    } catch (error) {
      console.error('Error creating conversion list or adding items:', error);
    }
  };
  

  const addNewItem = () => {
    setItems([...items, { ingredient: '', originalMeasurement: '', originalUnit: '', convertedMeasurement: '', convertedUnit: '' }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (['originalMeasurement', 'originalUnit', 'convertedUnit'].includes(field)) {
      const { originalMeasurement, originalUnit, convertedUnit } = updatedItems[index];
      if (originalMeasurement && originalUnit && convertedUnit) {
        const convertedValue = convertMeasurement(parseFloat(originalMeasurement), originalUnit, convertedUnit);
        updatedItems[index].convertedMeasurement = convertedValue ? convertedValue.toString() : '';
      }
    }

    setItems(updatedItems);
  };

  return (
    <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

          {items.map((item, index) => (
            <Grid container spacing={2} key={index}>
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
                  select
                  fullWidth
                  margin="normal"
                  value={item.originalUnit}
                  onChange={(e) => updateItem(index, 'originalUnit', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit.id} value={unit.unitName}>
                      {unit.unitName}
                    </MenuItem>
                  ))}
                </TextField>
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
                  disabled // Auto-populated based on conversion
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Converted Unit"
                  variant="outlined"
                  select
                  fullWidth
                  margin="normal"
                  value={item.convertedUnit}
                  onChange={(e) => updateItem(index, 'convertedUnit', e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit.id} value={unit.unitName}>
                      {unit.unitName}
                    </MenuItem>
                  ))}
                </TextField>
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
