import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useListsStore } from '../stores/listsStore';

const Lists: React.FC = () => {
  const { lists, fetchLists, toggleFavorite } = useListsStore();

  useEffect(() => {
    // Fetch all conversion lists on component mount
    fetchLists();
  }, [fetchLists]);

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
              <Typography variant="body1">{list.name}</Typography>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
};

export default Lists;
