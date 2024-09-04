import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useFavoritesStore } from '../stores/favoritesStore';

const Favorites: React.FC = () => {
  const { favorites, fetchFavorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    // Fetch the user's favorite conversion lists on component mount
    fetchFavorites();
  }, [fetchFavorites]);

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
      <Box sx={{
        width: '50%',
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '5px',
      }}>
        <Typography variant="h5" gutterBottom>Favorite Conversions</Typography>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <Paper key={favorite.id} sx={styles.listItem}>
              <Typography variant="body1">{favorite.name}</Typography>
              <Button
                variant="contained"
                color={favorite.favorite ? 'secondary' : 'primary'}
                onClick={() => toggleFavorite(favorite.id)}
              >
                {favorite.favorite ? 'Unfavorite' : 'Favorite'}
              </Button>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">No favorites found.</Typography>
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
    width: '100%',
  } as React.CSSProperties,
};

export default Favorites;
