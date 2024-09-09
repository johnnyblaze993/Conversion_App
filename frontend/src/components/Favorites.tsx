import React, { useEffect } from "react";
import { Container, Paper, Typography, Box, Button, useTheme } from "@mui/material";
import { useListsStore } from "../stores/listsStore"; // Import the list store

const Favorites: React.FC = () => {
  const { lists, fetchLists, toggleFavorite } = useListsStore(); // Use the list store
  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    // Fetch the user's conversion lists on component mount
    fetchLists(); // This will include both favorite and non-favorite lists
  }, [fetchLists]);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default, // Use theme's background color
      }}
    >
      <Box
        sx={{
          width: "75%",
          padding: "20px",
          backgroundColor: theme.palette.background.paper, // Use theme's paper background
          color: theme.palette.text.primary, // Use theme's primary text color
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Favorite Conversions
        </Typography>
        {lists.filter((list) => list.favorite).length > 0 ? ( // Filter favorites from lists
          lists
            .filter((list) => list.favorite) // Show only favorite lists
            .map((list) => (
              <Paper
                key={list.id}
                sx={{
                  ...styles.listItem,
                  backgroundColor: theme.palette.background.paper, // Dynamic background
                }}
              >
                <Typography variant="body1">{list.name}</Typography>
                <Button
                  variant="contained"
                  color={list.favorite ? "secondary" : "primary"} // Use theme's secondary or primary color
                  onClick={() => toggleFavorite(list.id, list.favorite)} // Pass current favorite state
                  sx={{
                    backgroundColor: list.favorite
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                    color: theme.palette.getContrastText(
                      list.favorite ? theme.palette.secondary.main : theme.palette.primary.main
                    ),
                    "&:hover": {
                      backgroundColor: list.favorite
                        ? theme.palette.secondary.dark
                        : theme.palette.primary.dark,
                    },
                  }}
                >
                  {list.favorite ? "Unfavorite" : "Favorite"}
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
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  } as React.CSSProperties,
};

export default Favorites;
