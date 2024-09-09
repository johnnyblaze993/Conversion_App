import React, { useState, useEffect } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { usePreferencesStore } from "../stores/preferencesStore";
import { useUnitStore } from "../stores/unitStore"; // Assuming you have a store to fetch units

const Preferences: React.FC = () => {
  const {
    themeType,
    selectedThemeIndex,
    toggleTheme,
    setThemeIndex,
    preferredUnit,
    setPreferredUnit,
  } = usePreferencesStore(); // Get theme and unit preferences from store

  const { units, fetchUnits } = useUnitStore(); // Assuming you have a unit store
  const [selectedUnit, setSelectedUnit] = useState(preferredUnit || "");

  useEffect(() => {
    fetchUnits(); // Fetch units when the component loads
  }, [fetchUnits]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeIndex(parseInt(event.target.value, 10)); // Update selected theme
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUnit = event.target.value;
    setSelectedUnit(newUnit); // Set the selected unit locally
    setPreferredUnit(newUnit); // Update the preferred unit in the store
  };

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        color: "text.primary",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h5">Preferences</Typography>

      {/* Theme Toggle */}
      <Button variant="contained" onClick={toggleTheme} sx={{ marginTop: 2 }}>
        Toggle to {themeType === "light" ? "Dark" : "Light"} Mode
      </Button>

      {/* Dropdown to select theme */}
      <TextField
        select
        label="Select Theme Option"
        value={selectedThemeIndex}
        onChange={handleThemeChange}
        sx={{ marginTop: 2, minWidth: 200 }}
      >
        {[1, 2, 3].map((option, index) => (
          <MenuItem key={index} value={index}>
            {themeType.charAt(0).toUpperCase() + themeType.slice(1)} Option{" "}
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Dropdown to select preferred unit */}
      <TextField
        select
        label="Preferred Unit"
        value={selectedUnit}
        onChange={handleUnitChange}
        sx={{ marginTop: 2, minWidth: 200 }}
      >
        {units.map((unit) => (
          <MenuItem key={unit.id} value={unit.unitName}>
            {unit.unitName}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Preferences;
