import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useListsStore } from "../stores/listsStore";
import { useConversionItemsStore } from "../stores/conversionItemsStore"; // Import conversion items store
import { useConversionStore } from "../stores/conversionStore"; // Import conversion store for deleting items
import { useSnackbarStore } from "../stores/snackbarStore"; // Import snackbar store

interface ConversionItem {
	id?: number;
	ingredient: string;
	originalMeasurement: number;
	originalUnitId: number;
	convertedMeasurement: number;
	convertedUnitId: number;
}

const Lists: React.FC = () => {
  const { lists, fetchLists, toggleFavorite, deleteConversionList } =
    useListsStore();
  const { conversionItems, fetchConversionItems} = useConversionItemsStore(); // Use conversion items store
  const { deleteConversion, 
    setConversionItems
   } = useConversionStore(); // Access the delete function from the conversion store
  const { showSnackbar } = useSnackbarStore(); // Use snackbar to show messages

  const [selectedListId, setSelectedListId] = useState<number | null>(null); // Track the selected list

  useEffect(() => {
    // Fetch all conversion lists on component mount
    fetchLists();
  }, [fetchLists]);

  const handleDeleteList = (id: number) => {
    deleteConversionList(id);
  };

  const handleDeleteConversionItem = async (id: number) => {
    try {
      await deleteConversion(id); // Delete the conversion item by its ID
      showSnackbar("Conversion item deleted successfully", "success"); // Show success snackbar
  
      // Remove the deleted item from the state immediately
      const updatedItems = conversionItems.filter((item: ConversionItem) => item.id !== id);
      setConversionItems(updatedItems); // Set the updated array directly
  
      // Refetch conversion items for the selected list to ensure it's up-to-date
      if (selectedListId) {
        fetchConversionItems(selectedListId);
      }
    } catch (error) {
      showSnackbar("Error deleting conversion item", "error"); // Show error snackbar
    }
  };
  
  

  // Handle click on a list to fetch conversion items
  const handleListClick = (listId: number) => {
    setSelectedListId(listId);
    fetchConversionItems(listId); // Fetch conversion items for the selected list
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#222",
      }}
    >
      <Box
        sx={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#333",
          color: "white",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Saved Conversion Lists
        </Typography>
        {lists.length > 0 ? (
          lists.map((list) => (
            <Paper
              key={list.id}
              sx={styles.listItem}
              onClick={() => handleListClick(list.id)} // Fetch conversion items when list is clicked
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body1">{list.name}</Typography>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={list.favorite}
                        onChange={() => toggleFavorite(list.id, list.favorite)} // Update with current favorite state
                        color={list.favorite ? "secondary" : "primary"}
                      />
                    }
                    label={list.favorite ? "Unfavorite" : "Favorite"}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering list click
                      handleDeleteList(list.id);
                    }}
                    sx={{
                      color: "red",
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              {/* Display conversion items if this list is selected */}
              {selectedListId === list.id && (
                <Box
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#444",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6">Conversion Items:</Typography>
                  {conversionItems.length > 0 ? (
                    conversionItems.map((item) => (
                      <Grid
                        container
                        key={item.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          backgroundColor: "#555",
                          marginBottom: "10px",
                        }}
                      >
                        <Grid item xs={8}>
                          <Typography variant="body2">
                            Ingredient: {item.ingredient}, Original:{" "}
                            {item.originalMeasurement} (Unit ID:{" "}
                            {item.originalUnitId}), Converted:{" "}
                            {item.convertedMeasurement} (Unit ID:{" "}
                            {item.convertedUnitId})
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            aria-label="delete"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering list click
                              handleDeleteConversionItem(item.id!); // Call delete handler
                            }}
                            sx={{ color: "red" }}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2">
                      No conversion items found.
                    </Typography>
                  )}
                </Box>
              )}
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
    padding: "10px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "5px",
    marginTop: "10px",
    position: "relative",
    cursor: "pointer", // Already added here
  } as React.CSSProperties,
};

export default Lists;
