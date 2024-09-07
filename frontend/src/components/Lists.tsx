import React, { useEffect, useState } from "react";
import {
	Container,
	Paper,
	Typography,
	Box,
	Checkbox,
	FormControlLabel,
	IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useListsStore } from "../stores/listsStore";
import { useConversionItemsStore } from "../stores/conversionItemsStore"; // Import conversion items store

const Lists: React.FC = () => {
	const { lists, fetchLists, toggleFavorite, deleteConversionList } =
		useListsStore();
	const { conversionItems, fetchConversionItems } = useConversionItemsStore(); // Use conversion items store

	const [selectedListId, setSelectedListId] = useState<number | null>(null); // Track the selected list

	useEffect(() => {
		// Fetch all conversion lists on component mount
		fetchLists();
	}, [fetchLists]);

	const handleDelete = (id: number) => {
		deleteConversionList(id);
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
										onClick={() => handleDelete(list.id)}
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
											<Typography key={item.id} variant="body2">
												{`Ingredient: ${item.ingredient}, Original: ${item.originalMeasurement} (Unit ID: ${item.originalUnitId}), Converted: ${item.convertedMeasurement} (Unit ID: ${item.convertedUnitId})`}
											</Typography>
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
