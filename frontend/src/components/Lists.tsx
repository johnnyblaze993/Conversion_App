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
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useListsStore } from "../stores/listsStore";
import { useConversionItemsStore } from "../stores/conversionItemsStore";
import { useConversionStore } from "../stores/conversionStore";
import { useSnackbarStore } from "../stores/snackbarStore";

interface ConversionItem {
  id?: number;
  ingredient: string;
  originalMeasurement: number;
  originalUnitId: number;
  convertedMeasurement: number;
  convertedUnitId: number;
}

const Lists: React.FC = () => {
  const theme = useTheme(); // Access the current theme
  const { lists, fetchLists, toggleFavorite, deleteConversionList } =
    useListsStore();
  const { conversionItems, fetchConversionItems } = useConversionItemsStore();
  const { deleteConversion, setConversionItems } = useConversionStore();
  const { showSnackbar } = useSnackbarStore();

  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const handleDeleteList = (id: number) => {
    deleteConversionList(id);
  };

  const handleDeleteConversionItem = async (id: number) => {
    try {
      await deleteConversion(id);
      showSnackbar("Conversion item deleted successfully", "success");

      const updatedItems = conversionItems.filter(
        (item: ConversionItem) => item.id !== id
      );
      setConversionItems(updatedItems);

      if (selectedListId) {
        fetchConversionItems(selectedListId);
      }
    } catch (error) {
      showSnackbar("Error deleting conversion item", "error");
    }
  };

  const handleListClick = (listId: number) => {
    setSelectedListId(listId);
    fetchConversionItems(listId);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default, // Theme background
      }}
    >
      <Box
        sx={{
          width: "50%",
          padding: "20px",
          backgroundColor: theme.palette.background.paper, // Theme paper background
          color: theme.palette.text.primary, // Theme text color
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
              sx={{
                ...styles.listItem,
                backgroundColor: theme.palette.background.paper, // Use theme for item background
              }}
              onClick={() => handleListClick(list.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body1" color="textPrimary">
                  {list.name}
                </Typography>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={list.favorite}
                        onChange={() =>
                          toggleFavorite(list.id, list.favorite)
                        }
                        color={list.favorite ? "secondary" : "primary"}
                      />
                    }
                    label={list.favorite ? "Unfav" : "Fav"}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(list.id);
                    }}
                    sx={{
                      color: theme.palette.error.main, // Use theme error color
                      position: "absolute",
                      top: 10,
                      right: -7,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              {selectedListId === list.id && (
                <Box
                  sx={{
                    marginTop: "10px",
                    backgroundColor: theme.palette.grey[900], // Darker background for conversions
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
                          backgroundColor: theme.palette.grey[800], // Even darker background
                          marginBottom: "10px",
                        }}
                      >
                        <Grid item xs={8}>
                          <Typography variant="body2" color="textSecondary">
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
                              e.stopPropagation();
                              handleDeleteConversionItem(item.id!);
                            }}
                            sx={{ color: theme.palette.error.main }} // Theme error color
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2">No conversion items found.</Typography>
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
    cursor: "pointer",
  } as React.CSSProperties,
};

export default Lists;
