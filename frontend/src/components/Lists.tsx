import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useListsStore } from '../stores/listsStore';

const Lists: React.FC = () => {
  const { lists, fetchLists, toggleFavorite, deleteConversionList } = useListsStore();

  useEffect(() => {
    // Fetch all conversion lists on component mount
    fetchLists();
  }, [fetchLists]);

  const handleDelete = (id: number) => {
    deleteConversionList(id);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#222',
      }}
    >
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        <Typography variant="h5" gutterBottom>Saved Conversion Lists</Typography>
        {lists.length > 0 ? (
          lists.map((list) => (
            <Paper key={list.id} sx={styles.listItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="body1">{list.name}</Typography>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={list.favorite}
                        onChange={() => toggleFavorite(list.id, list.favorite)} // Update with current favorite state
                        color={list.favorite ? 'secondary' : 'primary'}
                      />
                    }
                    label={list.favorite ? 'Unfavorite' : 'Favorite'}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(list.id)}
                    sx={{
                      color: 'red',
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">No conversion lists found.</Typography>
        )}
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
    position: 'relative', // Required for the red circle to be positioned absolutely
  } as React.CSSProperties,
};

export default Lists;