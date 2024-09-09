import React from "react";
import { Button, Container, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default, // Use theme background
        color: theme.palette.text.primary, // Use primary text color for readability
      }}
    >
      <Box>
        <Button
          variant="contained"
          color="secondary" // Use secondary color from the theme
          component={Link}
          to="/convert"
          sx={{
            fontSize: "24px",
            padding: "20px 40px",
            backgroundColor: theme.palette.secondary.main, // Use the theme's secondary color
            color: theme.palette.secondary.contrastText, // Ensure text contrasts with the button
            borderRadius: "8px", // Add a smooth border radius
            boxShadow: `0px 4px 12px ${theme.palette.secondary.light}`, // Add subtle shadow with lighter tone
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark, // Darker shade on hover
              boxShadow: `0px 6px 15px ${theme.palette.secondary.dark}`, // Enhanced shadow on hover
            },
          }}
        >
          Convert
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
