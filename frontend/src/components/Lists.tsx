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
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>Saved Conversion Lists</Typography>
        {lists.length > 0 ? (
          lists.map((list) => (
            <Paper key={list.id} style={styles.listItem}>
              <Typography variant="body1">{list.name}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={list.favorite}
                    onChange={() => toggleFavorite(list.id)}
                    color="primary"
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
