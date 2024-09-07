import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Container,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";
import { useUnitStore } from "../stores/unitStore"; // Fetch units from the store
import { usePreferencesStore } from "../stores/preferencesStore"; // Store for managing preferred unit
import { useSnackbarStore } from "../stores/snackbarStore"; // Store for triggering Snackbar

const Preferences: React.FC = () => {
	const { units, fetchUnits } = useUnitStore(); // Fetch units from the store
	const { preferredUnit, setPreferredUnit } = usePreferencesStore(); // Manage preferred unit
	const { showSnackbar } = useSnackbarStore(); // Show Snackbar when preference is saved
	const [selectedUnit, setSelectedUnit] = useState<string>(preferredUnit || ""); // Track selected unit

	useEffect(() => {
		fetchUnits(); // Fetch units on component mount
	}, [fetchUnits]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setPreferredUnit(selectedUnit); // Save the selected unit
		showSnackbar(`Preferred unit set to ${selectedUnit}`, "success"); // Show success Snackbar
	};

	return (
		<Container
			maxWidth="md"
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				style={{
					padding: "20px",
					backgroundColor: "#333",
					color: "white",
					width: "100%",
				}}
			>
				<Typography variant="h5" gutterBottom>
					User Preferences
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Preferred Unit"
						variant="outlined"
						fullWidth
						margin="normal"
						value={selectedUnit}
						onChange={(e) => setSelectedUnit(e.target.value)}
						InputLabelProps={{ style: { color: "white" } }}
						InputProps={{ style: { color: "white" } }}
						select // Dropdown for units
					>
						{units.map((unit) => (
							<MenuItem key={unit.id} value={unit.unitName}>
								{unit.unitName}
							</MenuItem>
						))}
					</TextField>

					<Button type="submit" variant="contained" color="primary" fullWidth>
						Save
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Preferences;
