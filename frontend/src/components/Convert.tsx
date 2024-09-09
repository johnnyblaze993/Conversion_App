import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material"; // Import the delete icon
import { useUnitStore } from "../stores/unitStore";
import { useAuthStore } from "../stores/authStore";
import { useConversionStore } from "../stores/conversionStore";
import { useListsStore } from "../stores/listsStore";
import { convertMeasurement } from "../utils/conversionUtils";
import { usePreferencesStore } from "../stores/preferencesStore";
import { useSnackbarStore } from "../stores/snackbarStore";

interface ConversionItem {
  id?: number;
  ingredient: string;
  originalMeasurement: string;
  originalUnit: string;
  convertedMeasurement: string;
  convertedUnit: string;
}

const Convert: React.FC = () => {
  const theme = useTheme(); // Access the theme
  const [listName, setListName] = useState<string>("");
  const [items, setItems] = useState<ConversionItem[]>([
    {
      ingredient: "",
      originalMeasurement: "",
      originalUnit: "",
      convertedMeasurement: "",
      convertedUnit: "",
    },
  ]);

  // store
  const { units, fetchUnits } = useUnitStore();
  const { showSnackbar } = useSnackbarStore();
  const { user } = useAuthStore(); // Fetch the logged-in user
  const { createList } = useListsStore();
  const { addConversionsToList } = useConversionStore();
  const { preferredUnit } = usePreferencesStore(); // Get the user's preferred unit

  useEffect(() => {
    fetchUnits();

    // Set the preferred unit as the default for the original unit of each item
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        originalUnit: preferredUnit, // Auto-fill preferred unit
      }))
    );
  }, [fetchUnits, preferredUnit]);

  // Function to map unit name to unit ID for the request
  const getUnitIdByName = (unitName: string) => {
    const unit = units.find((u) => u.unitName === unitName);
    return unit ? unit.id : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listName) {
      showSnackbar("Please enter a list name.", "error");
      return;
    }

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      // Step 1: Create the conversion list
      const listResponse = await createList(listName, false);

      if (listResponse) {
        const listId = listResponse.id;

        // Step 2: Prepare the conversion items, filtering out invalid unit IDs
        const formattedItems = items
          .map((item) => {
            const originalUnitId = getUnitIdByName(item.originalUnit);
            const convertedUnitId = getUnitIdByName(item.convertedUnit);

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
          .filter((item) => item !== null);

        if (formattedItems.length === 0) {
          showSnackbar("No valid conversions to add.", "error");
          return;
        }

        // Step 3: Submit the valid items
        await addConversionsToList(listId, formattedItems);

        showSnackbar(
          "Conversion list and items added successfully!",
          "success"
        );

        // Step 4: Clear the form
        setListName(""); // Reset list name
        setItems([
          {
            ingredient: "",
            originalMeasurement: "",
            originalUnit: preferredUnit, // Set the preferred unit for the new item
            convertedMeasurement: "",
            convertedUnit: "",
          },
        ]);
      }
    } catch (error) {
      console.error("Error creating conversion list or adding items:", error);
    }
  };

  // Disable the submit button if any of the required fields are missing or all fields are empty
  const isSubmitDisabled =
    items.length === 0 ||
    items.every(
      (item) =>
        !item.ingredient ||
        !item.originalMeasurement ||
        !item.originalUnit ||
        !item.convertedUnit
    );

  const addNewItem = () => {
    setItems([
      ...items,
      {
        ingredient: "",
        originalMeasurement: "",
        originalUnit: preferredUnit, // Auto-fill the preferred unit for new item
        convertedMeasurement: "",
        convertedUnit: "",
      },
    ]);
  };

  // Handle closing without saving
  const handleClose = () => {
    setListName(""); // Clear the list name
    setItems([
      {
        ingredient: "",
        originalMeasurement: "",
        originalUnit: preferredUnit || "",
        convertedMeasurement: "",
        convertedUnit: "",
      },
    ]); // Clear the items
    showSnackbar("Form cleared without saving.", "info"); // Show Snackbar
  };

  // Handle deleting an individual item
  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); // Remove the selected item
    setItems(updatedItems);
  };

  // Update an individual item and auto-calculate the converted measurement
  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (
      ["originalMeasurement", "originalUnit", "convertedUnit"].includes(field)
    ) {
      const { originalMeasurement, originalUnit, convertedUnit } =
        updatedItems[index];
      if (originalMeasurement && originalUnit && convertedUnit) {
        const convertedValue = convertMeasurement(
          parseFloat(originalMeasurement),
          originalUnit,
          convertedUnit
        );
        updatedItems[index].convertedMeasurement = convertedValue
          ? convertedValue.toString()
          : "";
      }
    }

    setItems(updatedItems);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default, // Theme background
      }}
    >
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: theme.palette.background.paper, // Theme paper background
          color: theme.palette.text.primary, // Theme text color
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create New Conversion List
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="List Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              style: { color: theme.palette.text.primary },
              sx: { backgroundColor: theme.palette.background.default },
            }}
          />

          <Box
            sx={{
              maxHeight: "200px", // Limit height to 200px
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            {items.map((item, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Ingredient"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.ingredient}
                    onChange={(e) =>
                      updateItem(index, "ingredient", e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                    InputProps={{
                      style: { color: theme.palette.text.primary },
                      sx: { backgroundColor: theme.palette.background.default },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Original Measurement"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={item.originalMeasurement}
                    onChange={(e) =>
                      updateItem(index, "originalMeasurement", e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                    InputProps={{
                      style: { color: theme.palette.text.primary },
                      sx: { backgroundColor: theme.palette.background.default },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Original Unit"
                    variant="outlined"
                    select
                    fullWidth
                    margin="normal"
                    value={item.originalUnit}
                    onChange={(e) =>
                      updateItem(index, "originalUnit", e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                    InputProps={{
                      style: { color: theme.palette.text.primary },
                      sx: { backgroundColor: theme.palette.background.default },
                    }}
                  >
                    {units.map((unit) => (
                      <MenuItem key={unit.id} value={unit.unitName}>
                        {unit.unitName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Converted Measurement"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={item.convertedMeasurement}
                    onChange={(e) =>
                      updateItem(index, "convertedMeasurement", e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                    InputProps={{
                      style: { color: theme.palette.text.primary },
                      sx: { backgroundColor: theme.palette.background.default },
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Converted Unit"
                    variant="outlined"
                    select
                    fullWidth
                    margin="normal"
                    value={item.convertedUnit}
                    onChange={(e) =>
                      updateItem(index, "convertedUnit", e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary },
                    }}
                    InputProps={{
                      style: { color: theme.palette.text.primary },
                      sx: { backgroundColor: theme.palette.background.default },
                    }}
                  >
                    {units.map((unit) => (
                      <MenuItem key={unit.id} value={unit.unitName}>
                        {unit.unitName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteItem(index)}
                    sx={{ color: theme.palette.error.main }} // Use theme error color
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Box>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addNewItem}
            sx={{ marginTop: "20px" }}
          >
            Add New Item
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ marginRight: "10px" }}
              disabled={isSubmitDisabled}
            >
              Save Conversion List
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              fullWidth
              sx={{ backgroundColor: theme.palette.action.hover }} // Hover background color
            >
              Close Without Saving
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Convert;
