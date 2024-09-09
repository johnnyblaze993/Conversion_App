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
            color: theme.palette.secondary.contrastText, // Ensure the text color contrasts with the button
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark, // Use dark shade on hover
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
